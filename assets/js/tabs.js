const tabs = document.querySelectorAll('[role="tablist"]')
tabs.forEach(tab => {
    const targets = tab.querySelectorAll('[data-tab-target]')
    targets.forEach(target => {
        target.addEventListener("click", () => {
            targets.forEach(target2 => {
                document.querySelector(target2.dataset.tabTarget).classList.remove("active")
                target2.classList.remove("active")
            });
            target.classList.add("active")
            document.querySelector(target.dataset.tabTarget).classList.add("active")
        })
    });
});
