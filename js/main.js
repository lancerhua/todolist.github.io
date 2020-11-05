$(function() {
    load();

    //添加数据
    $(".addbut").on("click", function() {
        var local = getData();
        local.push({ title: $("input").val(), done: false });
        saveData(local);
        load();
        $("input").val("");
    });
    $(".add input").on("keydown", function(e) {
        if (e.keyCode === 13) {
            var local = getData();
            local.push({ title: $("input").val(), done: false });
            saveData(local);
            load();
            $("input").val("");
        }
    });

    //删除记录
    $(".todolist,.donelist").on("click", "a", function() {
        var data = getData();
        var index = $(this).attr("id");
        data.splice(index, 1);
        saveData(data);
        load();
    });

    //记录分组
    $(".todolist,.donelist").on("click", "input", function() {
        var data = getData();
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked");
        saveData(data);
        load();
    });

    //function

    //获取数据
    function getData() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    //存数据
    function saveData(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    //加载渲染页面
    function load() {
        var data = getData();
        $(".todolist, .donelist").empty();
        $.each(data, function(i, n) {
            if (n.done) {
                $(".donelist").prepend("<li><input type='checkbox' checked='checked'><p>" + n.title + "</p><a href='javascript:;' id='" + i + "'>删除</a></li>");
            } else {
                $(".todolist").prepend("<li><input type='checkbox'><p>" + n.title + "</p><a href='javascript:;' id='" + i + "'>删除</a></li>");
            }

        });
    }
})