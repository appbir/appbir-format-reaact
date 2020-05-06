## CSS transform 属性 
允许你旋转，缩放，倾斜或平移给定元素。  
> 这是通过修改CSS视觉格式化模型的坐标空间来实现的。


### 一. 语法
```
none | <transform-list>
where 
<transform-list> = <transform-function>+

where 
<transform-function> = <matrix()> | <translate()> | <translateX()> | <translateY()> | <scale()> | <scaleX()> | <scaleY()> | <rotate()> | <skew()> | <skewX()> | <skewY()> | <matrix3d()> | <translate3d()> | <translateZ()> | <scale3d()> | <scaleZ()> | <rotate3d()> | <rotateX()> | <rotateY()> | <rotateZ()> | <perspective()>

where 
<matrix()> = matrix( <number>#{6} )
<translate()> = translate( <length-percentage> , <length-percentage>? )
<translateX()> = translateX( <length-percentage> )
<translateY()> = translateY( <length-percentage> )
<scale()> = scale( <number> , <number>? )
<scaleX()> = scaleX( <number> )
<scaleY()> = scaleY( <number> )
<rotate()> = rotate( [ <angle> | <zero> ] )
<skew()> = skew( [ <angle> | <zero> ] , [ <angle> | <zero> ]? )
<skewX()> = skewX( [ <angle> | <zero> ] )
<skewY()> = skewY( [ <angle> | <zero> ] )
<matrix3d()> = matrix3d( <number>#{16} )
<translate3d()> = translate3d( <length-percentage> , <length-percentage> , <length> )
<translateZ()> = translateZ( <length> )
<scale3d()> = scale3d( <number> , <number> , <number> )
<scaleZ()> = scaleZ( <number> )
<rotate3d()> = rotate3d( <number> , <number> , <number> , [ <angle> | <zero> ] )
<rotateX()> = rotateX( [ <angle> | <zero> ] )
<rotateY()> = rotateY( [ <angle> | <zero> ] )
<rotateZ()> = rotateZ( [ <angle> | <zero> ] )
<perspective()> = perspective( <length> )

where 
<length-percentage> = <length> | <percentage>
```
> transform属性可以指定为关键字值none 或一个或多个transform-function值。



### 二、 transform-origin 变形的原点
https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-origin

CSS属性让你更改一个元素变形的原点。

转换起点是应用转换的点。例如，rotate()函数的转换原点是旋转中心。（这个属性的应用原理是先用这个属性的赋值转换该元素，进行变形，然后再用这个属性的值把元素转换回去）  

参考transform_origindemo


#### 2.1 默认值
```
50% 50% 0
```

#### 2.2 参数说明
* 一个值(一维)(X轴)

  必须是length，percentage，或 left, center, right, top, bottom关键字中的一个

* 二个值(2二维)(X、Y轴)

  其中一个必须是length，percentage，或left, center, right关键字中的一个。

  另一个必须是length，percentage，或top, center, bottom关键字中的一个。

* 一个值(三维)(X、y、z轴)

  前两个值和只有两个值时的用法相同。

  第三个值必须是length。它始终代表Z轴偏移量。









### transform-function 变换函数

https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function

要应用的一个或多个CSS变换函数。 变换函数按从左到右的顺序相乘，这意味着复合变换按从右到左的顺序有效地应用。

CSS数据类型用于对元素的显示做变换。通常，这种变换可以由矩阵表示，并且可以使用每个点上的矩阵乘法来确定所得到的图像。


#### 1. rotate 



