(()=> {
    const progressBarElement = document.createElement('div')
    progressBarElement.classList = 'progress-bar'

    const progressTextElement = document.createElement('div')
    progressTextElement.classList = 'progress-text'

    document.body.appendChild(progressBarElement)
    document.body.appendChild(progressTextElement)
    
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');

    function updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = getDocHeight();
        const winHeight = window.innerHeight;

        const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;

        progressBar.style.width = `${scrollPercent}%`;
        progressText.textContent = `${scrollPercent.toFixed(2)}% tamamlandı`;
    }

    function getDocHeight() {
    const body = document.body;
    const html = document.documentElement;

    return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    }

    window.addEventListener('scroll', updateProgress);

    updateProgress();
})()