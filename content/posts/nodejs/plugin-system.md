---
title: NodeJs Eklenti Sistemi Kodlama
description: Bu makalede NodeJs ile eklenti kodlamayı öğrenebilirsiniz.
slug: nodejs-eklenti-sistemi-kodlama
tags: ["nodejs", "javascript"]
ShowToc: true
cover:
  image: "/plugin-system/cover.png"
  alt: "JavaScript Classes"
  caption: "JavaScript Classes"
  relative: true
author: omer
date: "2023-03-21"
---

## Eklenti Nedir?

JavaScript ile proje geliştirirken projelerin başkaları tarafından kolayca düzenlenebilmesini, geliştirilebilmesini isteyebilirsiniz. Örneğin Quill.js' i bilmeyenimiz yoktur; kendisi başarılı bir WYSIWYG editörüdür. Bu kütüphaneyi kullanırken eğer içine özellik eklemek istiyorsak kütüphanenin kendi kodlarını düzenlemeden, bize sağladığı sınırlar içerisinde istediğimiz eklentiyi kodlayabiliriz ve çok daha kullanışlı bir hale getirebiliriz. Kaldı ki Github'da geliştiriciler tarafından kodlanmış bir sürü eklenti mevcuttur.

> {{<color color="yellow">}}Not:{{< /color >}}
> Anlaşılmadıysa tarayıcınızdaki eklentileri düşünebilirsiniz. Normalde olmayan harika özellikleri tarayıcınıza eklemeyi sağlar.


Sizde projenize eklenti sistemini eklemek istiyorsanız bu makalede NodeJs ile nasıl eklenti sistemini yapabileceğimizi öğrenicez.

## Projeyi Kurma

Şimdi ilk adımlarımız olarak boş bir proje oluşturalım. Bunun için aşağıdaki komutları kullanabiliriz;

- `mkdir eklentili-nodejs-projem`
- `cd eklentili-nodejs-projem`
- `npm init -y`
- `npm i express`

Bu komutlar ile NodeJs projemizi oluşturmuş olucaz. `index.js` dosyasını kuralım ve `express` ile basit bir serveri oluşturalım.

```js
const express = require('express');
const EventEmitter = require('events');

class App extends EventEmitter {
  constructor() {
    super();

    this.server = express();
    this.server.use(express.json());
  }

  start() {
    this.server.get('/', (req, res) => {
      res.send('Hello World!');
    });

    this.server.listen(8080, () => {
      console.log('Server started on port 3000')
      this.emit('start');
    });
  }

  stop() {
    if (this.stopped) return;
    console.log('Server stopped');
    this.emit('stop');
    this.stopped = true;
    process.exit();
  }
}

const app = new App();
app.start();

["exit", "SIGINT", "SIGUSR1", "SIGUSR2", "SIGTERM", "uncaughtException"].forEach(event => {
  process.on(event, () => app.stop());
});
```

## İlk Eklentimiz

İlk olarak başlamak için ufak bir eklenti kodlayalım. Bu eklentilerde 2 temel fonksiyon olucak; **load** ve **unload**. Load, eklentinin kurulum esnasında; Unload; eklentiyi durdururken çalışıcaktır.

İlk eklentimiz Api'nin aldığı istek sayısını saymak için bir middleware görevi görücektir ve bir API route ekleyerek istek sayısını geri döndürebilecektir.

```js
const fs = require('fs');

let count = 0;

function load(app) {
  try {
    count = +fs.readFileSync('./counter.txt');
  } catch (e) {
    console.log('counter.txt not found. Starting from 0');
  }

  app.server.use((req, res, next) => {
    count++;
    next();
  });

  app.server.get('/count', (req, res) => {
    res.send({ count });
  })
}

// İstek sayısını kaydet
function unload(app) {
  fs.writeFileSync('./counter.txt', count);
}

module.exports = {
  load,
  unload
};
```

## Eklentileri Ekleme

Şimdi de eklentileri sisteme ekleyeceğiz. Bunun için **plugins.js** isimli dosyayı kullanacağız.

```js
const fs = require("fs");

class Plugins {
  constructor(app) {
    super();
    this.app = app;
    this.plugins = {};
  }

  // Ayarlardaki eklentileri yükler
  async loadFromConfig(path='./plugins.json') {
    const plugins = JSON.parse(fs.readFileSync(path)).plugins;
    for (let plugin in plugins) {
      if (plugins[plugin].enabled) {
        this.load(plugin);
      }
    }
  }

  // Yüklenecek eklentinin yolunu (path) alır ve yükler
  async load(plugin) {
    const path = plugins[plugin];
    try {
      const module = require(path);
      this.plugins[plugin] = module;
      await this.plugins[plugin].load(this.app);
      console.log(`Loaded plugin: '${plugin}'`);
    } catch (e) {
      console.log(`Failed to load '${plugin}'`)
      this.app.stop();
    }
  }
}

module.exports = Plugins;
```

Eklenmesini istediğimiz eklentileri saklamak için `plugins.json` isimli dosyayı kullanabiliriz.

```js
{
  "counter": "./counter.js"
}
```

Son olarak bu eklenti sistemini yazılımımıza eklemek için `index.js` dosyasını düzenleyelim.

```js
const express = require('express');
const Plugins = require('./plugins');

class App {
  constructor() {
    super();

    this.plugins = new Plugins(this);

    this.server = express();
    this.server.use(express.json());
  }

  async start() {
    await this.plugins.load();

    this.server.get('/', (req, res) => {
      res.send('Hello World!');
    });

    this.server.listen(8080, () => {
      console.log('Server started on port 3000')
    });
  }

  stop() {
    if (this.stopped) return;
    console.log('Server stopped');
    this.stopped = true;
    process.exit();
  }
}

const app = new App();
app.start();

["exit", "SIGINT", "SIGUSR1", "SIGUSR2", "SIGTERM", "uncaughtException"].forEach(event => {
  process.on(event, () => app.stop());
});
```

## Eklentileri Durdurma

Şimdi eklentilerimize eklediğimiz **unload** fonskiyonunu kullanalım. Bunu eklentimizi durdurmak için kullanıcaz.

```js
const fs = require("fs");

class Plugins {
  constructor(app) {
    super();
    this.app = app;
    this.plugins = {};
  }

  async loadFromConfig(path='./plugins.json') {
    const plugins = JSON.parse(fs.readFileSync(path)).plugins;
    for (let plugin in plugins) {
      if (plugins[plugin].enabled) {
        this.load(plugin);
      }
    }
  }

  async load(plugin) {
    const path = plugins[plugin];
    try {
      const module = require(path);
      this.plugins[plugin] = module;
      await this.plugins[plugin].load(this.app);
      console.log(`Loaded plugin: '${plugin}'`);
    } catch (e) {
      console.log(`Failed to load '${plugin}'`)
      this.app.stop();
    }
  }

  unload(plugin) {
    if (this.plugins[plugin]) {
      this.plugins[plugin].unload();
      delete this.plugins[plugin];
      console.log(`Unloaded plugin: '${plugin}'`);
    }
  }

  stop() {
    for (let plugin in this.plugins) {
      this.unload(plugin);
    }
  }
}

module.exports = Plugins;
```

Güvenli olarak sistemdeki tüm eklentileri durdurmak için **index.js** dosyasındaki **App** sınıfına **stop** methodunu ekleyebiliriz.

```js
stop() {
  if (this.stopped) return;
+ this.plugins.stop();
  console.log('Server stopped');
  this.stopped = true;
  process.exit();
}
```

## Güvenlik

Bu sistem sadece sizin kodladığınız eklentiler eklentiler ile çalışıcaksa hiçbir sorun olmadan çalışacaktır. **Fakat** eğerki WordPress gibi kullanıcıların yükleyebildiği bir eklenti sistemi ile çalıştıracaksanız, güvenli değildir çünkü eklentiler tüm sistem özelliklerine erişim sağlayabilecektir. Bu tür bir durumda **Hook**'ları kullanmalısınız ve farklı bir eklenti sistemi oluşturmalısınız. Dilerseniz bunu da başka bir makalede anlatabilirim.