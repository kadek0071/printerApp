//Preloader remover and content loader

window.addEventListener('load', setTimeout( () => {
    const spinner = document.querySelector('.spinner');   
    spinner.classList.add('spinner-finish');    
    setTimeout( () => {
        const preloader = document.querySelector('.preload');
        const website_content = document.querySelector('.website-content');
        preloader.classList.add('preload-finish');
        website_content.classList.remove("website-content");
    }, 400)
}, 1000));

