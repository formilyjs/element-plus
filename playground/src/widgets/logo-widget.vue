<template>
    <div class="logo-container">
        <a href="/">
            <img
                class="logo"
                src="https://element-plus.org/images/element-plus-logo.svg"
                alt="Element Plus Logo"
            />
        </a>
    </div>
</template>
<style scoped lang="less">
.logo-container {
    display: flex;
    align-items: center;
    height: var(--header-height);
    a {
        height: 28px;
        width: 128px;
    }
    .logo {
        height: 100%;
        max-width: 100%;
    }
}
</style>