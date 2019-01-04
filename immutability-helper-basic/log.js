let hasLog = false;

function divide() {
    console.log('---------------------------------------------------------------------------------------------\n');
}

module.exports = {

    log(tag, value) {
        if (!hasLog) {
            hasLog = true;
        }
        divide();
        console.log(tag, value, '\n');
    },

    print() {
        if (!hasLog) {
            divide();
            console.log('注意事项：', 'index 文件的 log 都被注释了哦，如需要观察哪个 API 请打开对应 log 查看结果。\n');
        }
        divide();
    }

}