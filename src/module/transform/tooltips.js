/********************************************
 *  所有的提示信息
 *********************************************/
import React from 'react';

export const transformOriginTips = () => {
    return (<div>
        <div>transform-origin 属性让你更改一个元素变形的原点。</div>
        <div>
            * 一个值(一维)(X轴)
        </div>
        <div>
            必须是length，percentage，或 left, center, right, top, bottom关键字中的一个
        </div>
        <div>
            * 二个值(2二维)(X、Y轴)
        </div>
        <div>
            其中一个必须是length，percentage，或left, center, right关键字中的一个。
        </div>
        <div>
            另一个必须是length，percentage，或top, center, bottom关键字中的一个。
        </div>
        <div>
            * 一个值(三维)(X、y、z轴)
        </div>
        <div>
            前两个值和只有两个值时的用法相同。
        </div>
        <div>
            第三个值必须是length。它始终代表Z轴偏移量。
        </div>
    </div>)
}


export const transformTips = () => {
    return (<div>
        <div>
            transform属性允许你旋转，缩放，倾斜或平移给定元素。这是通过修改CSS视觉格式化模型的坐标空间来实现的。
        </div>
        <div>
            transform属性可以指定为关键字值none 或一个或多个transform-function值
        </div>
        <div>
            none不应用任何变换。
        </div>
    </div>)
}


