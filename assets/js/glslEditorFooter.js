$('.glsl_editor').each(function(i, obj) {
    // Get file name
    var shaderFile = $(obj).attr("data");
    // Get texture
    if ($(obj).attr("data-textures")) {
        var tex = $(obj).attr("data-textures");
        console.log(tex);
    }
    $.ajax({
        type: 'GET',
        url: '/assets/shaders/' + shaderFile,
        success: function(shader) {
            // success
            obj = new GlslEditor(obj, {
                canvas_size: 400,
                canvas_draggable: false,
                canvas_resizable: false,
                theme: 'monokai',
                multipleBuffers: false,
                watchHash: false,
                fileDrops: false,
                menu: false,
                canvas_follow: true,
                frag: shader
            });
        }
    });
});
