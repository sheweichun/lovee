# ![](/images/markdown.png)
This JavaScript library produces complementary background generated from supplied images.
## Demo

[Check it out](https://sheweichun.github.io/lovee/demo/)

## Install

install from npm:`npm install lovee`


## Usage


```html
<!--the gradients will be applied to these outer divs, as background-images-->
<div class="lovee-wrap">
    <img src="./samples/xxx.jpg" alt="" />
</div>
<div class="lovee-wrap">
    <img src="./samples/xxx.jpg" alt="" />
</div>
```
If you've installed from npm, you can use the library like so:

```javascript
import Lovee from 'lovee'
/**choose any render you need**/
// import LoveeCanvas from 'lovee/dist/loveeCanvas'
// import LoveeSvg from 'lovee/dist/loveeSvg'
// import LoveeImage from 'lovee/dist/loveeImage'
// initialise as above
```

If you have the `lovee` in your project, you can include it with a script tag and initialise it like so:

```html
<script src="path/to/lovee.js"></script>
<!-- <script src="path/to/loveeCanvas.js"></script>
<script src="path/to/loveeImage.js"></script>
<script src="path/to/loveeSvg.js"></script> -->
<script type="text/javascript">
    window.addEventListener('load', function(){
        Lovee('.lovee-wrap',[render],[option])
    })
</script>
```
lovee need render to generate complementary background,in lovee,it provides three render:loveeCanvas,loveeImage,loveeSvg

## render
  the third parameter in lovee `option` will be deliver to render

### loveeCanvas
  option should like beblow:
  * target : `[String|Object]` selector or HTMLElement which will applied background
  * image : `[String|Object]` image selector or HTMLImageElement
  * ratio : `[Number]` canvas ratio
  * limit : `[Number]` calculated colors count
  * type  : `[String]` '1':linear-gradient , '0':rgba
  * angle : `[String]`    linear-gradient angle
  * setText : `[String]` should set color

`example`:
```
  import Lovee from 'lovee'
  import LoveeCanvas from 'lovee/dist/loveeCanvas'

  lovee('.lovee-wrap',LoveeCanvas,{

  })
```
  ### loveeSvg
    option should like beblow:
  * target : `[String|Object]` selector or HTMLElement which will applied background
  * image : `[String|Object]` image selector or HTMLImageElement
  * ratio : `[Number]`  svg ratio

`example`:
```
  import Lovee from 'lovee'
  import LoveeSvg from 'lovee/dist/loveeSvg'

  lovee('.lovee-wrap',LoveeSvg,{

  })
```

  ### loveeImage
    option should like beblow:

  * target : `[String|Object]` selector or HTMLElement which will applied background
  * image : `[String|Object]` image selector or HTMLImageElement
  * type : `[String]`  '1':extract left 1px imageData , '0':extract right 1px imageData

`example`:
```
  import Lovee from 'lovee'
  import LoveeImage from 'lovee/dist/loveeImage'

  lovee('.lovee-wrap',LoveeImage,{

  })
```


## CORS images

For all images, you can optionally also include a cross-origin attribute in your image.

```html
<img src="/xxx.jpg" cross-origin="anonymous"/>
```
