---
title: Hugo Klasör Yapısı
slug: hugo-klasor-yapisi
tags: ["hugo"]
ShowToc: true
cover:
  image: "/hugo/hugo.png"
  alt: "Hugo"
  caption: "Hugo"
  relative: true
author: arda
date: "2022-12-19"
---

## Static Klasörü

Static klasöründe css, js ve img dosyalarını barındırabiliriz. Bu public_html mantığıyla çalışmakta, içerisine ne atarsak ana dizindeymiş gibi oluyor.

## Content Klasörü

Content klasöründe web sitenin içerikleri yani .md dosyaları bulunmakta. Bu içerikleri gruplandırmak istersek içerisinde klasör oluşturabiliyoruz. Eğer Çok dil kullanıyorsak klasör isimleri ülke kodlarına göre olmalıdır.

## Data Klasörü

Data klasöründe başka sayfalarda kullanabileceğimiz veriler bulunmakta. Bu veriler .yml dosyası olarak tutulmakta ve dosya isimlerinin bir önemi yoktur.

## i18n Klasörü

i18n klasöründe çok dilli özelliği aktif edince otomatik olarak çağırılacak dil dosyaları ve bu dosyaların içerisinde kelimeler, görseller ve bağlantılar bulunmaktadır. Bu veriler .yml dosyası olarak tutulmakta ve dosya isimlerinin ülke kodlarına göre olması gerekir.

## Layouts Klasörü

Layouts klasöründe temanın parçalanmış dosyalarını, kısa kodları, özelliştirilmiş sayfaların şablonlarını barındırabiliriz. Bu veriler .html olarak tutulur.

## Config Klasörü

Config klasörü çok dilli web sitelerde birden fazla config dosyasını ayırmak için kullanılır.

## Themes Klasörü

Themes klasörü birden fazla tema test etmek için temaların karışmamasını sağlayan klasördür. Bu klasör sayesinde birden fazla tema deneyip config.toml dosyasında tek satır kodla istediğimiz temayı sitede kullanabiliriz.

## Archetypes Klasörü

Eğer konsoldan yeni bir markdown dosyası oluşturmak isterseniz, o oluşan dosyanın varsayılan değerlerini belirlediğimiz klasördür. Bu klasöre ayarları eklediğimizde artık konsoldan markdown dosyası oluşturursak bizim archetypes klasöründe belirdediğimiz ayarlarda oluşur.