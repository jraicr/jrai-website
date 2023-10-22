<template>
    <div class="anim"><img src="/animation.gif" width="125" height="104.16"
            alt="Animación de un personaje de Zelda llamado Link corriendo." decoding="async" loading="lazy" /></div>
</template>

<script>
export default {
    mounted() {
        let windowWidth = window.innerWidth;

        window.onresize = () => {
            windowWidth = window.innerWidth
        }

        listenMouseOverGanon(windowWidth);
        document.addEventListener("astro:after-swap", listenMouseOverGanon);

        function listenMouseOverGanon() {
            if (windowWidth >= 1024) { // Only attach mouseOver eventListener if condition is meet
                let playingAnim = false;

                document.querySelector(".ganon-word")?.addEventListener("mouseover", function () {
                    if (windowWidth >= 1024) { // Needed because the window size could be changed after condition was meet previously
                        let animDiv = document.querySelector(".anim");
                        let body = document.body;

                        if (!playingAnim) {
                            playingAnim = true;

                            animDiv?.classList.add("anim-play");
                            body.classList.add("hide-scroll-temporal-overflow");

                            setTimeout(() => {
                                playingAnim = false;
                                animDiv?.classList.remove("anim-play");
                                body.classList.remove("hide-scroll-temporal-overflow");
                            }, 2100);
                        }
                    }
                });
            }
        }
    }
}
</script>