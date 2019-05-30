// 當文件已經全載入至記憶體時，開始執行程式
$(document).ready(function() {

    // 清空 store
    $('#store').empty();
    $('#page').hide()

    var items = null
    var pageCount = 21
    var showItems = (page) => {
        if (items == null) return
        var start = (page - 1) * pageCount
        var end = start + pageCount - 1
        $('#store').empty();
        for (var i = start; i <= end; i++) {
            if (items[i] === undefined) {
                continue;
            }
            newItem(items[i]);
        }
    }

    var newItem = (item) => {
        $img = $('<img>').attr('class', 'image').attr('src', item.image)
        $h3 = $('<h3>').attr('class', 'name').text(item.name)
        $p = $('<p>').attr('class', 'price').text('NT$ ' + item.price)

        $item = $('<div>').attr('class', 'item product').append($img).append($h3).append($p)
        $col = $('<div>').attr('class', 'col-md-4 col-xs-6').append($item)

        $('#store').append($col)
    }

    var newPage = (n) => {
        var pageNum = n / 21
        pageNum = (n % 21 != 0) ? pageNum + 1 : pageNum

        $('#page-number').empty()

        $la = $('<a>').attr('class', 'page-link').attr('href', '#').attr('tabindex', '-1').attr('aria-disabled', 'true').text('«')
        $lli = $('<li>').attr('class', 'page-item').addClass('disabled').append($la)

        $('#page-number').append($lli)

        // 插入分頁數字
        for (var i = 1; i <= pageNum; i++) {
            $a = $('<a>').attr('class', 'page-link').attr('href', '#').text(i)

            $a.on('click', function() {
                var i = $(this).text()
                showItems(Number(i))
                for (var j = 1; j <= pageNum; j++) {
                    $("#value" + j).attr("class", "page-item");
                }
                $("#value" + i).attr("class", "page-item active");
            })

            var strActive = ((i == 1) ? ' active' : '')
            $li = $('<li>').attr('class', 'page-item' + strActive).append($a)
            $li.attr('id', 'value' + i);
            $('#page-number').append($li)
        }

        $ra = $('<a>').attr('class', 'page-link').attr('href', '#').text('»')
        $rli = $('<li>').attr('class', 'page-item').append($ra)
        $('#page-number').append($rli)
    }

    $('#query').on('click', function() {
        $.get('https://js.kchen.club/B03204032/query', function(response) {
            if (response) {
                // 伺服器有回傳資料
                if (response.result) {
                    $('#store').empty();
                    // 資料庫有回傳資料
                    items = response.items

                    // for (var i = 0; i < items.length; i++) {
                    //     newItem(items[i])
                    // }

                    // 加了分頁效果，預設顯示第一頁
                    showItems(1)

                    // 顯示分頁和設定分頁的函式
                    $('#page').show()
                    newPage(items.length)

                } else {
                    $('#message').text('查無相關資料')
                    $('#dialog').modal('show')
                }
            } else {
                $('#message').text('伺服器出錯')
                $('#dialog').modal('show')
            }

            console.log(response)
        }, "json")
    })

    $("insert_button").on("click", function() {
        $a = $('<a>').attr('class', 'page-link').attr('href', 'www.yahoo.com.tw');
        $a[0].click();
    });
})