$(document).on('mouseenter', '#start', function() {
    $('#start').attr('src','/images/start2.png?v=2');
});
$(document).on('click', '#start', function() {
    if($('#menu-start').css('bottom')[0] === '-') $('#menu-start').css({'bottom':'38px'});
    else $('#menu-start').css({'bottom':'-100%'});
});

function openMenuStart() {
    $('#menu-start').css({'bottom':'38px'});
}
function closeMenuStart() {
    $('#menu-start').css({'bottom':'-100%'});
}

$(document).on('mouseleave', '#start', function() {
    $('#start').attr('src','/images/start.png');
});

$(document).on('mouseenter', '#search', function() {
    $('#search').css({'bottom':'-2px'});
    $('#search').attr('src','/images/search2.png?v=2');
});
$(document).on('mouseleave', '#search', function() {
    $('#search').css({'bottom':'-1px'});
    $('#search').attr('src','/images/search.png');
});