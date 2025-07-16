<template>
    <Layout>
        <template #home-hero-before>
            <div class="hero-container">
                <div class="hero-div">
                    <img class="hero-image" src="/images/AlTareq.png" />
                </div>
            </div>
        </template>
        <template #nav-bar-content-after>
            <div class="VPNavBarMenuGroup">
                <div class="vp-nav-dropdown" @mouseenter="open = true" @mouseleave="open = false">
                    <button class="dropdown-button">
                        <span style="margin-right: 3px;">{{ globalState.version }}</span> <span
                            class="vpi-chevron-down text-icon"></span>
                    </button>
                    <div v-show="open" class="dropdown-menu">
                        <div class="VPMenu">
                            <div class="items" v-if="globalState.version === '1.2.0'"
                                @click="globalState.version = '2.0.0'">2.0.0</div>
                            <div class="items" v-if="globalState.version === '2.0.0'"
                                @click="globalState.version = '1.2.0'">1.2.0</div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <!-- <template #sidebar-top>
            <div style="padding: 1rem;">
                <img src="../../public/images/AlTareq.png" alt="Logo" style="width: 100%;" />
            </div>
        </template> -->

    </Layout>
</template>


<script setup>
import { ref, computed } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { globalState } from '../stores/globalState'

const { Layout } = DefaultTheme

// dropdown open state
const open = ref(false)

// navigation helper
</script>

<style scoped>
.hero-container {
    margin-top: calc((var(--vp-nav-height) + var(--vp-layout-top-height, 0px)) * -1);
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 48px) 24px 0px;
}

@media (min-width: 640px) {
    .hero-container {
        padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px) 64px 0px;
    }
}

.hero-div {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 1152px;
}


.hero-image {
    position: absolute;
    transform: translateY(15px);
    width: 180px;
}

html.dark .hero-image {
    content: url("/images/AlTareq-light.png");
}


@media (min-width: 640px) {
    .hero-image {
        width: 300px;
    }
}


.vp-nav-dropdown {
    position: relative;
    margin-left: 1rem;
}

.dropdown-button {
    background: transparent;
    border: none;
    color: var(--vp-c-text-1);
    cursor: pointer;
    padding: 6px 8px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    line-height: var(--vp-nav-height);
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-text-1);
    transition: color 0.25s;
}

.dropdown-button:hover {
    color: var(--vp-c-text-2);
}



.dropdown-menu {
    position: absolute;
    top: calc(100% - 20px);
    right: 0;
    border-radius: 12px;
    padding: 12px;
    min-width: 128px;
    border: 1px solid var(--vp-c-divider);
    background-color: var(--vp-c-bg-elv);
    box-shadow: var(--vp-shadow-3);
    transition: background-color 0.5s;
    max-height: calc(100vh - var(--vp-nav-height));
    overflow-y: auto;
}

.vp-nav-dropdown:hover .dropdown-menu {
    opacity: 1;
    pointer-events: auto;
}

.dropdown-menu .items {
    cursor: pointer;
    padding: 0 12px;
    border-radius: 6px;
    line-height: 32px;
    font-size: 14px;
    font-weight: 500;
    transition: background-color 0.25s, color 0.25s;
}

.dropdown-menu .items:hover {
    color: var(--vp-c-brand-1);
    background-color: var(--vp-c-default-soft);
}
</style>