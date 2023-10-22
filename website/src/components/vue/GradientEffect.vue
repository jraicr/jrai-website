<!-- GradientEffect.vue -->
<template>
  <div class="gradient-container"></div>
</template>

<script>
export default {
  mounted() {
    let gradientContainer = document.querySelector(".gradient-container");
    let webContainer = document.querySelector(".web-container");

    let currentGradientPosition = { x: 0, y: 0 };
    let targetGradientPosition = { x: 0, y: 0 };
    let animationFrameId = null;
    let isGradientMoving = false;
    let lastTime = Date.now();

    startGradientEffect();

    // Añade un controlador de eventos para reiniciar el efecto del gradiente después de un intercambio de Astro
    document.addEventListener("astro:after-swap", awakeGradientEffect);

    /**
     * Despierta el efecto del gradiente después de un intercambio de Astro.
     */
    function awakeGradientEffect() {
        gradientContainer = document.querySelector(".gradient-container");
        webContainer = document.querySelector<HTMLElement>(".web-container");
        startGradientEffect();
    }

    /**
     * Inicia el efecto del gradiente.
     */
    function startGradientEffect() {
        let currentScreenWidth = window.innerWidth;

        if (currentScreenWidth >= 1024) {
            onMouseMovementUpdateTargetGradientPos();
            onScrollCenterGradient();
            updateCurrentGradientPosition();
        }
    }

    /**
     * Actualiza la posición objetivo del gradiente.
     *
     * @param {number} x - La coordenada x de la posición objetivo.
     * @param {number} y - La coordenada y de la posición objetivo.
     */
    function updateTargetGradientPos(x, y) {
        targetGradientPosition.x = x;
        targetGradientPosition.y = y;
        restartAnimation();
    }

    /**
     * Añade un controlador de eventos para actualizar la posición objetivo del
     * gradiente a la posición del puntero del ratón.
     */
    function onMouseMovementUpdateTargetGradientPos() {
        // gradientContainer?.addEventListener(
        webContainer.addEventListener("mousemove", (e) => {
            updateTargetGradientPos(
                e.pageX,
                Math.abs(e.pageY - window.scrollY),
            );
        });
    }

    /**
     * Añade un controlador de eventos para actualizar la posición objetivo del gradiente al centro
     * de la ventana (con un offset hacia el contenido) visible cuando se hace scroll.
     */
    function onScrollCenterGradient() {
        window.addEventListener("scroll", (e) => {
            let offsetX = 250;
            let targetX = window.scrollX + window.innerWidth / 2 + offsetX;
            let targetY = window.innerHeight / 2;

            updateTargetGradientPos(targetX, targetY);
        });
    }

    /**
     * Actualiza la posición actual del gradiente.
     */
    function updateCurrentGradientPosition() {
        let dx = Math.abs(currentGradientPosition.x - targetGradientPosition.x);
        let dy = Math.abs(currentGradientPosition.y - targetGradientPosition.y);
        let distance = Math.sqrt(dx * dx + dy * dy);

        let lerpFactor = 4.45; // Determina velocidad de movimiento del gradiente

        isGradientMoving = distance > 1;

        // console.debug(`Is gradient moving?: ${isGradientMoving}`, currentGradientPosition);

        if (isGradientMoving) {
            currentGradientPosition = interpolate(
                currentGradientPosition,
                targetGradientPosition,
                lerpFactor,
            );

            if (gradientContainer) {
                gradientContainer.style.background = `radial-gradient(600px circle at ${currentGradientPosition.x}px ${currentGradientPosition.y}px, hsla(266, 76.6%, 48%, 0.15), transparent 80%)`;
            }

            animationFrameId = requestAnimationFrame(
                updateCurrentGradientPosition,
            );
        } else if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }

    /**
     * Reinicia la animación si el gradiente no se está moviendo y no hay ningún cuadro de animación solicitado.
     */
    function restartAnimation() {
        if (!isGradientMoving && !animationFrameId) {
            updateCurrentGradientPosition();
        }
    }

    /**
     * Interpola entre la posición actual y la posición objetivo del gradiente.
     *
     * @param {Object} currentPosition - La posición actual del gradiente.
     * @param {Object} targetPosition - La posición objetivo del gradiente.
     * @param {number} factor - El factor de interpolación.
     *
     * @return {Object} La nueva posición interpolada del gradiente.
     */
    function interpolate(
        currentPosition,
        targetPosition,
        factor,
    ) {
        let now = Date.now();
        let elapsed = now - lastTime;
        lastTime = now;

        let dx = targetPosition.x - currentPosition.x;
        let dy = targetPosition.y - currentPosition.y;

        // Multiplica el factor por el tiempo transcurrido
        factor *= elapsed / 1000;
        // console.log(factor);

        return {
            x: currentPosition.x + dx * factor,
            y: currentPosition.y + dy * factor,
        };
    }
  },
};
</script>