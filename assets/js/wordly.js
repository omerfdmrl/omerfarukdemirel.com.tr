(() => {
    var element = document.querySelector('.post-content')
    var content = element.innerHTML
    words.forEach(word => {
        word.word.forEach(w => {
            const regex = new RegExp(`(${w})`, 'g')
            const matches = content.match(regex)
            if(!matches.length) return;
            let context = `<span data-wordly `
            Object.keys(word).forEach((attributeKey) => {
                if(['word'].includes(attributeKey)) return;
                context += `data-${attributeKey}='${word[attributeKey]}'`
            });
            context += `><a href="javascript:void(0);" >${w}</a></span>`
            element.innerHTML = element.innerHTML.replaceAll(w, context)
        });
    });

    const wordlies = document.querySelectorAll('[data-wordly]')
    wordlies.forEach(wordly => {
        const parent = document.createElement('div')
        parent.classList = "wordly"
        if(wordly.dataset.title) {
            const childTitle = document.createElement('h3')
            childTitle.innerHTML = wordly.dataset.title
            childTitle.classList = 'wordly-title'
            parent.appendChild(childTitle)
        }
        if(wordly.dataset.image) {
            const childImage = document.createElement('img')
            childImage.src = wordly.dataset.image
            childImage.classList = 'wordly-image'
            parent.appendChild(childImage)
        }
        if(wordly.dataset.description) {
            const childDescription = document.createElement('div')
            childDescription.innerHTML = wordly.dataset.description
            childDescription.classList = 'wordly-description'
            parent.appendChild(childDescription)
        }
        wordly.appendChild(parent)

        var timer;
        wordly.addEventListener('mouseenter', (e) => {
            clearTimeout(timer)
            if(document.documentElement.clientHeight - wordly.getBoundingClientRect().bottom < 350) {
                wordly.querySelector('.wordly').classList.add('wordly-opposite')
            }else {
                wordly.querySelector('.wordly').classList.remove('wordly-opposite')
            }
            wordly.querySelector('.wordly').classList.add('wordly-active')
        })
        wordly.querySelector('.wordly').addEventListener('mouseenter', () => {
            clearTimeout(timer)
        })
        var deleteClassEvent = () => {
            timer = setTimeout(() => {
                if(!wordly.matches(':hover') && !wordly.querySelector('.wordly').matches(':hover')) {
                    wordly.querySelector('.wordly').classList.remove('wordly-active')
                }
            }, 20);
        }
        wordly.addEventListener('mouseleave', deleteClassEvent)
        wordly.querySelector('.wordly').addEventListener('mouseleave', deleteClassEvent)
    });
})()