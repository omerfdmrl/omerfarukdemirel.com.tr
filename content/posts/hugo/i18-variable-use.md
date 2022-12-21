---
title: Hugo i18n Değişken Kullanımı
description: Bu makalede Hugo i18n değişken kullanımı hakkında bilgi alabilirsiniz.
slug: hugo-i18-degisken-kullanimi
tags: ["hugo"]
ShowToc: true
cover:
  image: "/hugo/hugo.png"
  alt: "Hugo"
  caption: "Hugo"
  relative: true
author: arda
date: "2022-12-20"
---

İlk olarak i18n klasörümüzü oluşturup daha sonra içerisinde dil adı şeklinde .toml dosyalarımızı oluşturuyoruz. Yani demek istediğim tr.toml veya en.toml.

Daha sonra bu dosyaların içerisine değerler veriyoruz örnek değerler aşağıdaki gibidir:

tr.toml dosyası:

    [page_title]
    
    other = "Türkçe Sayfa"

en.toml dosyası:

    [page_title]
    
    other = "English Home"

Daha sonra bunu kullanmak istediğimiz yerde şu kodu kullanıyoruz:

    {{ i18n "page_title" }}

Bu kod eğer EN sayfasındaysak en.toml dosyasındaki değeri eğer TR sayfasındaysak tr.toml dosyasındaki değeri yazdıracaktır.
