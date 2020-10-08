$(function () {
  var layer = layui.layer
  var form = layui.form

  initArtCateList()
  //获取文章分类的列表
  function initArtCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        // layer.msg(res.message)
        //利用模板引擎渲染数据至tbody中
        var htmlStr = template("tpl-table", res)
        $('tbody').html(htmlStr)
      }
    })
  }
  //给添加类别按钮绑定点击事件
  $('#btnAddCate').on('click', function () {
    //弹出层
    layer.open({
      type: 1,
      title: '添加文章分类',
      area: ['500px', '250px'],
      content: $('#dialog-add').html()
    });
  })
  //监听表单的提交事件
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('添加文章类别失败')
        }
        layer.msg('添加文章类别成功')
        layer.closeAll('page');
        initArtCateList()
      }
    })
  })
  //给编辑按钮绑定点击事件
  $('tbody').on('click', '.btn-edit', function () {
    //弹出层
    layer.open({
      type: 1,
      title: '添加文章分类',
      area: ['500px', '250px'],
      content: $('#dialog-edit').html()
    });
    //通过自定义属性Id来判断当前点击的是哪一行的编辑按钮
    var id = $(this).attr('data-id')
    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + id,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('修改文章分类失败')
        }
        layer.msg('修改文章分类成功')
        form.val('form-edit', res.data);
      }
    })

  })
  //通过代理的形式，为修改分类的表单绑定submit事件
  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message)
      }
    })
    layer.closeAll('page')
    initArtCateList()
  })
  //通过代理的形式，为删除按钮绑定点击事件
  $('tbody').on('click', '.btn-delete', function () {
    var id = $(this).siblings('button').attr('data-id')
    //是否确认删除此列数据
    layer.confirm('是否确认删除数据？', {
      icon: 3,
      title: '提示'
    }, function (index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg('删除数据失败')
          }
          layer.msg('删除数据成功')
          initArtCateList();
        }
      })

      layer.close(index);
    });
  })
})