<template>
    <p class="greeting-line" @click="playGreetingAnim">Hola</p>
</template>
  
<script>
export default {
    props: ['greeting'],
    data() {
        return {
            runningAnimation: false
        }
    },
    methods: {
        playGreetingAnim() {
            if (!this.runningAnimation) {
                this.runningAnimation = true;
                this.$el.classList.add("greeting-line-animation");

                let greetingStyle = window.getComputedStyle(this.$el);
                let animDurationInSeconds = parseFloat(greetingStyle.getPropertyValue("animation-duration"));
                let animDurationInMiliseconds = animDurationInSeconds * 1000;
                let durationOffset = 250;

                setTimeout(() => {
                    this.removeAnimation("greeting-line-animation");
                    this.runningAnimation = false;
                }, animDurationInMiliseconds + durationOffset);
            }
        },
        removeAnimation(animationName) {
            this.$el.classList.remove(animationName);
        }
    },
}
</script>