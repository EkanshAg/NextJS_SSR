module.exports = {
    presets: ["next/babel"],
    plugins: ["@babel/plugin-transform-runtime"],
    env: {
        test: {
            plugins: ["@babel/plugin-transform-runtime"],
            "presets": ["next/babel"],
        }
    }
};