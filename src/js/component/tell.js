/**
 *
 * name: tell
 * date: 2018/11/12
 * author: cengfucheng
 * about: 说明文件
 *
 */

/*
*
* 说明
* 所有，背景图，人物图等等，都做成组件。供流程模块调用
* 解构如下
* */


// 组件数组，存放所有组件。。。供模块调用
let component = [

]

let node = {
    component: ['人1组件', '人2组件', 'bg组件'],    //默认采用3个组件
    start () {
        // 开始前 函数
        this.component[2];      // 绘制背景组件
    },
    group: [                // 单独用每个组件，都从自身查找，如果没有，再全局component里面找。如果没有，就报错
        {
            type: '',
            value: '',
        },
        {
            type: '',
            value: '',
        },
        {
            type: '',
            value: '',
        }
    ],
    end () {
        // 当前模块 结束/进入下一个模块前
        this.component.forEach( (v) => {
            // v.close();   默认关闭每个组件。。。

        })
    }
}
