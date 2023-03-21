---
title: Javascript'de Class'lar Gerçek Midir?
description: Bu makalede Javascript'de Class'ların gerçek olup olmadığını ve yazar görüşü hakkında bilgi alabilirsiniz.
slug: javascriptde-classlar-gercek-midir
tags: ["javascript"]
ShowToc: true
cover:
  image: "/javascript/is-classes-real/cover.png"
  alt: "JavaScript Classes"
  caption: "JavaScript Classes"
  relative: true
author: omer
date: "2022-12-19"
---

## Class Nedir?

JavaScript prototip tabanlı bir dildir ve javascript'teki her nesnenin, nesne özelliklerini ve yöntemlerini genişletmek için kullanılabilecek [[Prototype]] adlı gizli bir dahili özelliği vardır.

JavaScript geliştiricileri, object-orianted design pattern (nesne yönelimli bir tasarım modeli) taklit etmek için **constructor** fonksiyonlarını kullandılar.

ES6 yani EcmaScript 2015 ile birlikte Class'ları JavaScript'de kullanabilir hale geldik. Aslında zaten JavaScript'de var olan Class yapısını getirme sebeplerinden başlıcası diğer dillerin çoğunun sahip olması ve temiz, düzenli kod yazılmasını mümkün kılması.

## Module Design Pattern'i Anlamak

JavaScript'de modüller belirli kod parçalarını diğer bileşenlerden bağımsız tutmak için kullanılır. **Public** (herkese açık) veya **Private** (gizli) olarak erişim seviyeleri belirlenebilir. 

Modüller'de özel kapsamları kullanabilmek için Immediately-Invoked-Function-Expressions (IIFE - hemen çağırılan fonksiyon) olarak tanımlanmalıdır.

### Immediately-Invoked-Function-Expressions Nedir?

Adından da anlaşılabileceği gibi fonksiyonun daha sonra çağırılması yerine tanımlanırken çağırılmasıdır.

{{< tabs tabTotal="2">}}
{{< tab tabName="Normal" >}}
```js
function foo(){
  return console.log('bar')
}
foo()
```
{{< /tab >}}
{{< tab tabName="IIFE" >}}
```js
(function(){
  return console.log('bar')
})()
```
{{< /tab >}}
{{< /tabs >}}

IIFE ile çağırılan fonksiyonların içerisindeki değişkenler dış dünya tarafında görülmez ve ulaşılamaz. Bu sayede özel kapsamlar kullanılabilir. Bir kere çalışıcak kodlar için kullanılmalıdır ve **global** yerine **yerel** değişkenlerle çalışacağı için kod performans açısından daha hızlı olur.

## Module Design Pattern'i Örnekleri

IIFE'yi de anladığımıza göre örneklere geçebiliriz. Temel yapı olarak şu şekildedir;

```js
(function() {

    // private değişkenler veya fonksiyonlar tanımlanır

    return {
        // public değişken veya fonksiyonlar tanımlanır
    }

})();
```

Yukarıdaki fonksiyon ile private ve public verilerimizi tanımlayabilriz. Şimdi biraz daha realistik örnek verelim.

```js
var EmployeeDetails = (function(){
  var name: "Ömer Faruk";
  var age = 19;
  var designation = "Developer",
  var salary = 10000;

  var calculateBonus = function(amount) {
    salary = salary + amount;
  }

  return {
    name: name,
    age: age,
    designation: designation,
    calculateBonus: calculateBonus
  }
})()

var userName = EmployeeDetails.calculateBonus(1000);
```

Bu örneğe bakıcak olursak `salary` değişkeninin fonksiyonda kullanıldığını fakat `return` edilmediği için dışarıdan ulaşılamayacağını görebilirsiniz. **calculateBonus** fonksiyonunda ikramiyeyi hesaplarken `salary` değişkeni kullanılmaktadır. Bu değişken `return` edilmeyip private olarak tanımlandığı için dışarıdan erişilemez fakat fonksiyon içerisinde kullanılmaya devam edebilir. 

> {{<color color="red">}}Dikkat!{{< /color >}}
> Public edilen değişkenlerin bir kopyası oluşur ve bunlar dışarıya sunulur. Eğerki değişken sonradan değişicek olsa bile ilk halindeki klonuna dışarıdan ulaşırız. Değişkenlerin değerlerinin değiştirilmesi vya okunması için `get` veya `set` metodları kullanılmalıdır.

## Class'lar Aslında Fonksiyon!

Şimdi bir sürü bilgi öğrendik fakat konunun daha iyi anlaşılabilmesi için gerekliydi. Yukarıdaki kodlara baktığınızda bir şeyi anımsatıyor mu? Class'lar. Class dediğimiz yapı aslında bir fonksiyondur ve Class tanımladığınız zaman aslında bir fonksiyon tanımlamış oluyorsunuz. Gelin şimdi inceleyelim;

```js
const x = function() {}
const y = class {}
console.log(typeof x); // function
console.log(typeof y); // function
```

Yukarıdaki örnekte görebileceğiniz gibi ikisininde çeşidi aynı ve **function**. 

## Class'ların Tanımlanması

Class'lar birer fonksiyon ise Class'lar ile yapabildiğimiz her şeyi fonksiyonlar ile de yapabilmemiz gerekir. Class'larda kullandığımız özelliklerin fonksiyonlarda nasıl tanımlandığını inceleyelim.

### Constructor

Class'ı çağırırken çalışan ve değişken tanımlamamızı sağlayan `constructor` fonksiyonunun nasıl çalıştığına bir bakalım;

{{< tabs tabTotal="2">}}
{{< tab tabName="Class" >}}
```js
class Hero {
	constructor(name, level) {
		this.name = name;
		this.level = level;
	}
}
```
{{< /tab >}}
{{< tab tabName="Fonksiyon" >}}
```js
function Hero(name, level) {
	this.name = name;
	this.level = level;
}
```
{{< /tab >}}
{{< /tabs >}}

### Metodlar

Class'ların içerisinde tanımladığımız metodların fonksiyonlar ile nasıl tanımlandığına da bakalım;

{{< tabs tabTotal="2">}}
{{< tab tabName="Class" >}}
```js
class Hero {
	constructor(name, level) {
		this.name = name;
		this.level = level;
	}

	hi() {
		return `${this.name} merhaba diyor.`;
  }
}
```
{{< /tab >}}
{{< tab tabName="Fonksiyon" >}}
```js
function Hero(name, level) {
	this.name = name;
	this.level = level;
}

Hero.prototype.hi = function() {
	return `${this.name} merhaba diyor.`;
}
```
{{< /tab >}}
{{< /tabs >}}

### Extend

Class'ların ve fonksiyonların avantajlı bir özelliği, üst öğeye dayalı olarak yeni bir nesne olarak geliştirilebilmesidir. Bu, benzer ancak bazı ek veya daha spesifik özelliklere ihtiyaç duyan nesneler için kodun tekrarlanmasını önler.

Aşağıdaki örnekte, `SuperHero` adlı daha spesifik bir **Hero** oluşturacağız ve `call()` kullanarak **Hero** özelliklerini atayacağız ve ek bir özellik ekleyeceğiz.

{{< tabs tabTotal="2">}}
{{< tab tabName="Class" >}}
```js
class SuperHero extends Hero {
	constructor(name, level, spell) {
		// Hero Class'ının constructorunu çağırma
		super(name, level);

		// Yeni özelliği ekle
		this.spell = spell;
	}
}
const ironman = new SuperHero('Tony Stark', 2, 'Money');
```
{{< /tab >}}
{{< tab tabName="Fonksiyon" >}}
```js
function SuperHero(name, level, spell) {
	// Hero fonksiyonunun constructorunu çağırma
	Hero.call(this, name, level);

  // Yeni özelliği ekle
	this.spell = spell;
}
const superman = new SuperHero('Clark Kent', 9999, 'Unlimited Power');
```
{{< /tab >}}
{{< /tabs >}}

## Kapanış

Bu yazıda Class'lar ve fonksiyonların benzerliğini ve nasıl çalıştığını öğrenmiş olduk. Nasıl çalıştığını anlamak bir dilde uzmanlaşmak için çok önemlidir. Daha fazlası için takipte kalabilir, eğer yazıda eksik veya hata gördüyseniz Github üzerinden düzenleyebilirsiniz.