$(document).ready(function () {
    var mark_user = 'X';
    var mark_comp = 'O';

    for (var item = 1; item < 10; item++) {
        if (localStorage.getItem('cell' + item)) {
            $('.cell'+item).text(localStorage.getItem('cell'+item));
        }
    }

    if (localStorage.getItem('result')){
        $('.result').text(localStorage.getItem('result'));
    }
    var exit_flag = false;
    var win_user_array = ['123','456','789','147','258','369','159','357'];
    function check_user_win(mark) {

        for(var i=0; i<8; i++){
            var first = 'cell' + win_user_array[i].substr(0,1);

            var second = 'cell' + win_user_array[i].substr(1,1);
            var third = 'cell' + win_user_array[i].substr(2,1);
            if( $('.'+first).text() == mark && $('.'+second).text() == mark && $('.'+third).text() == mark){

                $('.'+first+',.'+second+',.'+third).css("background-color", "#83e2c3");
                localStorage.setItem('result', 'You win');
                $('.result').text(localStorage.getItem('result'));
                $('.tic-tac-toe .block').unbind('click');
                localStorage.setItem('exit_flag', true);
                exit_flag == true;
            }
        }
    }
    function check_result() {

        var count_not_empty = 0;
        for( var r=1; r<=9; r++){
            if($('.cell'+r).text() !== ''){
                count_not_empty +=1;
            }
            if(count_not_empty == 9 && exit_flag == false ){
                for( var l=1; l<=9; l++) {
                    $('.cell'+l).css("background-color", "#FFFF00");
                }
                localStorage.setItem('result', 'Tie');
                $('.result').text(localStorage.getItem('result'));
            }
        }
    }
    function check_2_comp(mark) {

        for(var i=0; i<8; i++){
            var first = 'cell' + win_user_array[i].substr(0,1);

            var second = 'cell' + win_user_array[i].substr(1,1);
            var third = 'cell' + win_user_array[i].substr(2,1);
            if( $('.'+first).text() == mark && $('.'+second).text() == mark && $('.'+third).text() == mark && exit_flag == false){

                localStorage.setItem(third, mark);
                $('.'+third).text(localStorage.getItem(third));
                $('.'+first+',.'+second+',.'+third).css("background-color", "#EF7C7C");
                localStorage.setItem('result', 'You lose');
                $('.result').text(localStorage.getItem('result'));
                $('.tic-tac-toe .block').unbind('click');
                localStorage.setItem('exit_flag', true);
                exit_flag = true;
            }
            if( $('.'+first).text() == mark && $('.'+second).text() == '' && $('.'+third).text() == mark && exit_flag == false ){

                localStorage.setItem(second, mark);
                $('.'+second).text(mark);
                $('.'+first+',.'+second+',.'+third).css("background-color", "#EF7C7C");
                localStorage.setItem('result', 'You lose');
                $('.result').text(localStorage.getItem('result'));
                $('.tic-tac-toe .block').unbind('click');
                localStorage.setItem('exit_flag', true);
                exit_flag = true;
            }
            if( $('.'+first).text() == '' && $('.'+second).text() == mark && $('.'+third).text() == mark && exit_flag == false ){

                localStorage.setItem(first, mark);
                $('.'+first).text(mark);
                $('.'+first+',.'+second+',.'+third).css("background-color", "#EF7C7C");
                localStorage.setItem('result', 'You lose');
                $('.result').text(localStorage.getItem('result'));
                $('.tic-tac-toe .block').unbind('click');
                localStorage.setItem('exit_flag', true);
                exit_flag = true;
            }
        }
    }
    function check_2_user(mark){
        for (var i = 0; i < 8; i++) {

            var first = 'cell' + win_user_array[i].substr(0,1);

            var second = 'cell' + win_user_array[i].substr(1,1);
            var third = 'cell' + win_user_array[i].substr(2,1);
            if( exit_flag == false ){


                if( $('.'+first).text() == mark && $('.'+second).text() == mark && $('.'+third).text() == '' ){
                    $('.'+third).text(mark_comp);
                    localStorage.setItem('exit_flag', true);
                    exit_flag = true;
                }
            }
            if( exit_flag == false ){

                if( $('.'+first).text() == mark && $('.'+second).text() == '' && $('.'+third).text() == mark ){
                    $('.'+second).text(mark_comp);
                    localStorage.setItem('exit_flag', true);
                    exit_flag = true;
                }
            }
            if( $('.'+first).text() == '' && $('.'+second).text() == mark && $('.'+third).text() == mark ){

                $('.'+first).text(mark_comp);
                localStorage.setItem('exit_flag', true);
                exit_flag = true;
            }

            if(exit_flag) break;
        }
    }
    $('.save').click(function(){

        if($('.tic-tac-toe .block').text() !==''){
            for(var i = 1; i<10 ; i++){
                localStorage.setItem('cell'+i, $('.cell'+i).text() );
            }
        }
    });
    $('.new').click(function(){
        localStorage.clear();
        location.reload()
    });
    $('.tic-tac-toe .block').click(function(){
        if( $(this).text() == '' ){
            $(this).text(mark_user);
            check_user_win(mark_user);
            check_2_comp(mark_comp);
            check_2_user(mark_user);

            if( exit_flag == false ){
                for (var i = 1; i < 10; i++) {
                    if( $('.cell'+i).text() == '' ){
                        $('.cell'+i).text(mark_comp);
                        break;
                    }
                }
            }else exit_flag = false;
            check_result();

        }
    });
});
