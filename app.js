document.addEventListener('DOMContentLoaded', () => {
    
    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            console.log(entries[0].isIntersecting)
            if(entry.isIntersecting) {
                entry.target.animate([
                    {transform: 'translateX(-10px)', opacity: 0},
                    {transform: 'translateX(0px)', opacity: 1}
                ], {
                    duration: 500
                })
                getNeko()
                observer.unobserve(entry.target)
            }
        }
    })

    async function getNeko() {
        const reponce = await fetch('https://nekos.best/api/v2/neko?amount=10');
        const rJson = await reponce.json();
        let i = 0
        for (const w in rJson.results) {
            const e = document.querySelector('.neko-container');
            const neko = document.createElement('img');
            neko.className = 'neko-view';
            neko.src = rJson.results[w].url;
            e.append(neko);
            i++
            if(i == 10) {
                neko.id = 'neko-observer'
                observer.observe(neko)
            }
        }        
    }
    getNeko()
})