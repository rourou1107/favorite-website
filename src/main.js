let indexLi // 控制修改时的完成按钮
let $add = $('.add')
let $alertName = $('.alertName')
let $alertUrl = $('.alertUrl')
let $done = $('.done')
let $cancle = $('.cancle')
let $alert = $('.alert')
let $liList = $('.liList')
let $list = $('.list')
let hashObj = JSON.parse(localStorage.getItem('hashMap'))
let hashMap = hashObj || [{ // 用来存用户用户所收藏的网站
    name: 'Vue 官网',
    url: 'http://doc.vue-js.com/'
}]

function isPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"]
    var flag = true
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false
            break
        }
    }
    return flag
}

// 控制弹框出现函数
function alertFrame(title, name, url) {
    $('.alertTitle').text(title)
    $('.alertWrapper').css('display', 'block')
    $alert.css('display', 'block')
    $alertName.val(name || '')
    $alertUrl.val(url || '')
    // $liList.css('pointer-events', 'none')
}

// 控制弹框隐藏函数
function hideFrame() {
    $('.alertWrapper').css('display', 'none')
    $('.alert').css('display', 'none')
    // $liList.css('pointer-events', 'auto')
}

function simplifyUrl(url){
    return url.replace('http://', '')
        .replace('https://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}



// 增加网站, index控制hashMap列表渲染的起始位置
function render(){
    for(let i = 0; i < hashMap.length; i++){
        let name = hashMap[i].name
        let url = simplifyUrl(hashMap[i].url)
        let $li = $(`
            <li class="liList">
                  <div>
                      <div class="name">
                          <p>${url[0].toUpperCase()}</p>
                      </div>
                      <p class="desc">${name}</p>
                      <p class="icon-menu" title="修改网站">
                          <svg class="icon">
                              <use xlink:href="#icon-menu"></use>
                          </svg>
                      </p>
                  </div>
             </li>
        `).insertBefore($add)
        // 点击菜单
        $li.on('click', '.icon-menu', (e) =>{
            e.stopPropagation()
            let indexArr = Array.from(ul.children)
            indexLi = indexArr.indexOf($li[0])
            alertFrame('修改网站信息', name, url)
        })
        // PC端鼠标经过,几秒后出现菜单
        $li.hover(function() {
            $(this).find('.icon-menu').addClass('appear')
        }, function() {
            $(this).find('.icon-menu').removeClass('appear')
        })
        $li.on('click', () =>{
            window.open(hashMap[i].url)
        })
    }
}


// JS逻辑开始
render()
// 点击添加
$add.click(()=>{
    alertFrame('增加网站')
})

// 点击完成
$done.click((e) =>{
    let name = $alertName.val()
    let url = $alertUrl.val()
    let parent = $(e.target.parentNode.parentNode)
    let title = parent.find('.alertTitle').text()
    if(title === '修改网站信息'){
        hashMap.forEach((item, index) => {
            if(item.name === name && item.url === url){
                hideFrame()
            }else if(index === indexLi) {
                item.name = name
                item.url = url
                $list.find('li:not(.add)').remove()
                render()
                hideFrame()
            }
        })
    }else {
        if(name&&url){
            let liObj = {name: name, url: url}
            hashMap.push(liObj)
            $list.find('li:not(.add)').remove()
            render()
        }
        hideFrame()
    }

})

// 点击删除
$alert.on('click', '.delete', (e)=>{
    let value = $(e.target.parentNode.parentNode).find('.alertName').val()
    let index = hashMap.findIndex((item)=>{
        return item.name === value
    })
    if(index !== -1){
        hashMap.splice(index, 1)
        $list.find('li:not(.add)').remove()
        render()
    }
    hideFrame()
})

// 点击取消
$cancle.click(()=>{
    hideFrame()
})

// 键盘事件

// $(document).keydown((e) =>{
//     if(isPC()){
//         let obj =hashMap.find((item) => {
//             return simplifyUrl(item.url)[0].toLowerCase() === e.key
//         })
//         if(obj){
//             window.open(obj.url)
//         }
//     }
// })

window.onbeforeunload = () => {
    // console.log(22222)
    let hashString = JSON.stringify(hashMap) // Object(Array) --> string
    localStorage.setItem('hashMap', hashString)
}
// console.log(JSON.stringify(hashMap))

// 解决safari上,onbeforeunload失效
window.addEventListener("pagehide", event => {
    if (event.persisted) {
        let hashString = JSON.stringify(hashMap) // Object(Array) --> string
        localStorage.setItem('hashMap', hashString)
    }
}, false);


