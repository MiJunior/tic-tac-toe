$(document).ready(function () {
    var mark_user = 'X';
    var mark_comp = 'O';

    var rand_num = Math.round((Math.random() * (9 - 1) + 1));

    if(rand_num > 3){
        var mark_user = 'O';
        var mark_comp = 'X';
        $('.cell'+rand_num).text(mark_comp);
    }
    var exit_flag = false;
    var win_user_array = ['123','456','789','147','258','369','159','357'];

    //определяем победу игрока
    function check_user_win(mark) {
        for(var i=0; i<8; i++){

            var first = 'cell' + win_user_array[i].substr(0,1);
            var second = 'cell' + win_user_array[i].substr(1,1);
            var third = 'cell' + win_user_array[i].substr(2,1);

            if( $('.'+first).text() == mark && $('.'+second).text() == mark && $('.'+third).text() == mark){
                $('.'+first+',.'+second+',.'+third).css("background-color", "#83e2c3");
                $('.result').text('Вы выиграли!');
                $('.tic-tac-toe .block').unbind('click');
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
            if(count_not_empty == 9){
                for( var l=1; l<=9; l++) {
                    $('.cell'+l).css("background-color", "#FFFF00");
                }
                $('.result').text('Ничья');
            }
        }
    }

    function check_2_comp(mark) {
        for(var i=0; i<8; i++){

            var first = 'cell' + win_user_array[i].substr(0,1);
            var second = 'cell' + win_user_array[i].substr(1,1);
            var third = 'cell' + win_user_array[i].substr(2,1);

            if( $('.'+first).text() == mark && $('.'+second).text() == mark && $('.'+third).text() == mark && exit_flag == false){
                $('.'+third).text(mark);
                $('.'+first+',.'+second+',.'+third).css("background-color", "#EF7C7C");
                $('.result').text('Вы проиграли!');
                $('.tic-tac-toe .block').unbind('click');
                exit_flag = true;
            }

            if( $('.'+first).text() == mark && $('.'+second).text() == '' && $('.'+third).text() == mark && exit_flag == false ){
                $('.'+second).text(mark);
                $('.'+first+',.'+second+',.'+third).css("background-color", "#EF7C7C");
                $('.result').text('Вы проиграли!');
                $('.tic-tac-toe .block').unbind('click');
                exit_flag = true;
            }

            if( $('.'+first).text() == '' && $('.'+second).text() == mark && $('.'+third).text() == mark && exit_flag == false ){
                $('.'+first).text(mark);
                $('.'+first+',.'+second+',.'+third).css("background-color", "#EF7C7C");
                $('.result').text('Вы проиграли!');
                $('.tic-tac-toe .block').unbind('click');
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
                    exit_flag = true;
                }
            }

            if( exit_flag == false ){
                if( $('.'+first).text() == mark && $('.'+second).text() == '' && $('.'+third).text() == mark ){
                    $('.'+second).text(mark_comp);
                    exit_flag = true;
                }
            }

            if( $('.'+first).text() == '' && $('.'+second).text() == mark && $('.'+third).text() == mark ){
                $('.'+first).text(mark_comp);
                exit_flag = true;
            }

            if(exit_flag) break;
        }
    }

    $('.tic-tac-toe .block').click(function(){
        //Если клетка пустая
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