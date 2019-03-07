<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style>
    *, *:before, *:after {
        box-sizing: border-box;
    }

    html, body {
        padding: 0;
        margin: 0;
        font-size: 14px;
    }

    ol, ul, li {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    input {
        line-height: 1;
        outline: none;
        border: 1px solid rgba(221, 221, 221, 1);;
    }

    button {
        border: 1px solid rgba(0, 0, 0, 0);
        outline: none;
        cursor: pointer;
    }

    ::-webkit-scrollbar {
        width: 6px;
        background: #eee;
    }

    ::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 20px;
    }

</style>
