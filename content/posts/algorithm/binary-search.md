---
title: Binary Search
tags: ["algorithm"]
ShowToc: true
cover:
  image: "/binary-search/cover.png"
  alt: "Binary Search"
  caption: "Binary Search"
  relative: true
author: ["Omer"]
---

## Binary Search Nedir?

Binary Search her türlü dataset ile çalışabilen ve içerisindeki verinin indexini bulmamızı sağlayan akıllı bir algoritmadır.

Büyük dizilerde doğrdan tek-tek yapılan kontrolden daha hızlı çalışır fakat dizinin küçükten büyüğe veya büyükten küçüğe doğru sıralı olması zorunludur, aksi halede çalışmayacaktır.

## Binary Search Nasıl Çalışır?

Binary search her bir işlemde arama uzayını yarı yarıya indirmek üzerinde kuruludur. Temel mantığı şu şekildedir;

1. Dizinin tam orasında bulunan veriyi seçer ve bu veri üzerinden kontrol yapar. 3 farklı durum vardır;
   1. Seçilen değer aradığımız değere eşit ise aradığımız değer bulunmuştur. Değeri geri döndürülür ve algoritma biter.
   2. Seçilen değer aradığımız değerden daha küçük ise aradığımız değer, seçtiğimiz verinin sol tarafındadır.
   3. Seçilen değer aradığımız değerden daha büyük ise aradığımız değer, seçtiğimiz verinin sağ tarafındadır.
2. Yukarıdaki 2. veya 3. seçecekten biri gerçekleşmiş ise kümemizin diğer kısmını sileriz ve yarıya indirmiş oluruz. Ardından 1. adımı tekrardan uygularız ve aradığımız değeri bulana kadar devam ederiz.

Aşşağıdaki örnekte tek-tek yapılan kontrole kıyasla ne kadar hızlı olduğunu görebilirsiniz.

![Binary Search Algorithm](/binary-search/algorithm.gif)

Şimdi daha iyi anlamak için örnek yapacak olursak `[-3,2,4,,4,9,12,34,42,102,157,180]`'den oluşan veri veri setinden **42** sayısını bulmaya çalışalım;

|                                   |                                  |                                  |                                  |                                  |                                     |                                     |                                     |                                      |                                    |
| --------------------------------- | -------------------------------- | -------------------------------- | -------------------------------- | -------------------------------- | ----------------------------------- | ----------------------------------- | ----------------------------------- | ------------------------------------ | ---------------------------------- | ---------------------------------- |
| -3 | 2 | 4 | 4 | 9 | {{< color color="green" >}}12{{< /color >}} | 34 | 42 | 102 | 157 | 180 |
| {{< color color="red" >}}-3{{< /color >}} | {{< color color="red" >}}2{{< /color >}} | {{< color color="red" >}}4{{< /color >}} | {{< color color="red" >}}4{{< /color >}} | {{< color color="red" >}}9{{< /color >}} | {{< color color="red" >}}12{{< /color >}}   | 34  | 42 | {{< color color="green" >}}102{{< /color >}} | 157 | 180  |
| {{< color color="red" >}}-3{{< /color >}} | {{< color color="red" >}}2{{< /color >}} | {{< color color="red" >}}4{{< /color >}} | {{< color color="red" >}}4{{< /color >}} | {{< color color="red" >}}9{{< /color >}} | {{< color color="red" >}}12{{< /color >}}   | {{< color color="green" >}}34{{< /color >}} | 42                                  | {{< color color="red" >}}102{{< /color >}}   | {{< color color="red" >}}157{{< /color >}} | {{< color color="red" >}}180{{< /color >}} |
| {{< color color="red" >}}-3{{< /color >}} | {{< color color="red" >}}2{{< /color >}} | {{< color color="red" >}}4{{< /color >}} | {{< color color="red" >}}4{{< /color >}} | {{< color color="red" >}}9{{< /color >}} | {{< color color="red" >}}12{{< /color >}}   | {{< color color="red" >}}34{{< /color >}}   | {{< color color="green" >}}42{{< /color >}} | {{< color color="red" >}}102{{< /color >}}   | {{< color color="red" >}}157{{< /color >}} | {{< color color="red" >}}180{{< /color >}} |

## Kodlama

Kodlamaya başlamadan önce aşşağıdaki işlemleri bilmemiz gerekmektedir;

1. **Zaman Karmaşıklığı:** O(log n)
2. **Yardımcı Alan:** O(1)
3. **Ortanca Değeri Bulma:** en_yuksek + ( en_dusuk + en_yuksek ) / 2

Son maddede neden **en_yuksek** değer ile topladığımızı merak ediyor olabilirsiniz. Direkt olarak `( en_dusuk + en_yuksek ) / 2` de yapabilirdik fakat bu **100%** doğruluk oranı vermeyecektir. Çünkü en düşük ve en yüksek değerlerden daha büyük değerleri aldığımızda başarısız olucaktır. Özellikle en düşük ve en yüksek değerin toplamı datasetimizdeki maximum pozitif değerden büyükse başarısız olucaktır. Sonuçta toplam değer negatif olur ve 2'ye bölündüğünde negatif olarak kaldır.

### Recursive

Python;

```py
# X'in indexini döndürür, yoksa -1 döndürür
 
def binarySearch(arr, l, r, x):
 
    # Temeli kontrol et
    if r >= l:
 
        mid = l + (r - l) // 2
 
        # Eğer eleman ortada mevcutsa
        # kendine eşittir
        if arr[mid] == x:
            return mid
 
        # Eğer element ortanca değerden küçükse
        # sadece sol tarafta olabilir
        elif arr[mid] > x:
            return binarySearch(arr, l, mid-1, x)
 
        # Bunun dışındaki durumlarda
        # sadece sağ tarafta olabilir
        else:
            return binarySearch(arr, mid + 1, r, x)
 
    else:
        # Element dizide yoktur
        return -1
 
 
# Tanımlamalar
arr = [2, 3, 4, 10, 40]
x = 10
 
# Fonksiyonu çağırma
result = binarySearch(arr, 0, len(arr)-1, x)
 
if result != -1:
    print("Element dizinde %d. sırada mevcut" % result)
else:
    print("Element dizide değildir")
```

Javascript;

```js
// X'in indexini döndürür, yoksa -1 döndürür

function binarySearch(arr, l, r, x){
    if (r >= l) {
        let mid = l + Math.floor((r - l) / 2);
 
        // Eğer eleman ortada mevcutsa
        // kendine eşittir
        if (arr[mid] == x)
            return mid;
 
        // Eğer element ortanca değerden küçükse
        // sadece sol tarafta olabilir
        if (arr[mid] > x)
            return binarySearch(arr, l, mid - 1, x);
 
        // Bunun dışındaki durumlarda
        // sadece sağ tarafta olabilir
        return binarySearch(arr, mid + 1, r, x);
    }
 
    // Element dizide yoktur
    return -1;
}
 
let arr = [ 2, 3, 4, 10, 40 ];
let x = 10;
let n = arr.length
let result = binarySearch(arr, 0, n - 1, x);
(result == -1) ? document.write( "Element dizide değildir")
                   : document.write(`Element dizinde ${result}. sırada mevcut `);
```

### Iterative

Python;

```py
# X'in indexini döndürür, yoksa -1 döndürür
 
def binarySearch(arr, l, r, x):
 
    while l <= r:
 
        mid = l + (r - l) // 2
 
        # Eğer eleman ortada mevcutsa
        # kendine eşittir
        if arr[mid] == x:
            return mid
 
        # Eğer element ortanca değerden küçükse
        # sadece sol tarafta olabilir
        elif arr[mid] < x:
            l = mid + 1
 
        # Bunun dışındaki durumlarda
        # sadece sağ tarafta olabilir
        else:
            r = mid - 1
 
    # Element dizide yoktur
    return -1
 
 
# Tanımlamalar
arr = [2, 3, 4, 10, 40]
x = 10
 
# Fonksiyonu çağırma
result = binarySearch(arr, 0, len(arr)-1, x)
 
if result != -1:
    print("Element dizinde %d. sırada mevcut" % result)
else:
    print("Element dizide değildir")
```


Javascipt;

```js
// X'in indexini döndürür, yoksa -1 döndürür
 
 function binarySearch(arr, x)
{   
    let l = 0;
    let r = arr.length - 1;
    let mid;
    while (r >= l) {
         mid = l + Math.floor((r - l) / 2);
  
        // Eğer eleman ortada mevcutsa
        // kendine eşittir
        if (arr[mid] == x)
            return mid;
  
        // Eğer element ortanca değerden küçükse
        // sadece sol tarafta olabilir
        if (arr[mid] > x)
            r = mid - 1;
             
        // Bunun dışındaki durumlarda
        // sadece sağ tarafta olabilir
        else
            l = mid + 1;
    }
  
    // Element dizide yoktur
    return -1;
}
 
arr =new Array(2, 3, 4, 10, 40);
x = 10;
n = arr.length;
result = binarySearch(arr, x);
     
(result == -1) ? document.write( "Element dizide değildir")
                   : document.write(`Element dizinde ${result}. sırada mevcut `);
```
