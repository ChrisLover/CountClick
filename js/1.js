var i = 0;  　　　　　　　　　　 //使用i来充当秒数统计setinterval方法的刷新次数
var timer = null;　　　　　　　　//接收setinterval的返回值，以便于暂停和重置功能的实现
var isRunning = false;　　　　　　//来定义开始按钮和定时器的状态，默认定时器不启动，button文字为开始

function $(id) {　　　　　　　　　　//定义一个函数，功能为简化js代码量，以便于快速通过id获取当前html元素
    return document.getElementById(id);
}

function doubleNumber(num) {　　　　//计时器辅助功能，因为计时器在小于10的时候只显示一位数，例如 1 ，2。。。
　　　　　　　　　　　　　　　　　　　　//而我们习惯的方式为01,02.。。，所以定义一个函数方法来优化用户体验
    if (num < 10) {　　　　
        return '0' + num;
    } else {
        return num;
    }
}

window.onload = function(){  　　　　　　 //使用window.onload = function()来让页面所有元素加载完毕之后才执行js代码，可以优化用户体验应对网速较慢的情况
    function funcStart(){　　　　　　　　　　//这是计时器的开始功能
        timer = setInterval(function(){　　　　//使用timer来接收setinterval的值，setinterval是js内置的计时器功能，执行过程为，。　　　　　　　　　　　　　　　　　　　　
　　　　　　　　　　　　　　　　　　　　//第一个参数为函数，第二个为毫秒数，经过指定的毫秒数来执行一次传入的函数
            i++;　　　　　　　　　　　　　　//这是计时器秒数分钟数和小时的基准“i”
            $("sec").innerHTML = doubleNumber(i % 60);  　　　　//秒数等于i%60，然后被doubleNumber方法应用，也就是上面所定义的的辅助功能
            $("min").innerHTML = doubleNumber(parseInt(i / 60) % 60);
            $("hour").innerHTML = doubleNumber(parseInt(i / 3600) % 60);
        },1000)  　　//每一千毫秒 = 一秒 刷新一次
    }
    function funcPause(){
        clearInterval(timer);　　　　//使用js内置功能暂停计时器
    }
    $("reset").onclick = function(){
        i = 0;　　　　　　　　　　//重置功能，将“i”设为0，然后暂停计时器，把时分秒标签内容归为字符串类型的‘00’；
        clearInterval(timer);
        $("sec").innerHTML = '00';
        $("min").innerHTML = '00';
        $("hour").innerHTML = '00';
        $("btn").innerHTML = "开始";　　　　//重置之后将btn的标签内容设置为“开始”
    }

    $("btn").onclick = function(){     //当id为btn的按钮被点击时，执行以下函数
        if (!isRunning) {
            $("btn").innerHTML = "暂停";　　　//设置btn标签内容为暂停
            funcStart();　　　　　　　　　　//  isRunning默认为false  那么isRunning的否就是true，就是代表当前计时器并没有运行，然后执行funcStart()功能
            isRunning = true　　　　//设置 isRunning = true，然后当再次点击btn按钮时则运行else函数，因为此时isRunning的否就是false了
        } else {
            $("btn").innerHTML = "开始";　　　　//设置btn标签内容为开始
            funcPause();　　　　　　　　　　//　　否则就执行funcPause()函数功能
            isRunning = false;　　　　　　//设置 isRunning =false，然后当再次点击btn按钮时则会运行if函数，因为此时isRunning的否就是true了
        }
    }
}
