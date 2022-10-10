<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');
include_once('../../config/db.php');
include_once('../../model/question.php');
    $db = new db();
    $connect = $db->connect();

    $question = new Question($connect);
    $read = $question->read();

    $num = $read->rowCount(); // dem kqa cua 1 hang nao do // tra ve 1 so nao do

   
    if($num>0){
        $question_array = [];
        $question_array['question'] = [];

        while($row = $read->fetch(PDO::FETCH_ASSOC)){
           extract($row);        
         //  var_dump($row);   
            $question_item = array(
                'id_question' => $id_cauhoi,
                'title' => $title,
                'cau_a' => $cau_a,
                'cau_b' => $cau_b,
                'cau_c' => $cau_c,
                'cau_d' => $cau_d,
                'cau_dung' => $cau_dung
            );
            array_push($question_array['question'],$question_item);// day mang  vao cuoi danh danh mang
        //    $question_array['data'] = $question_item;// day mang  vao mang  cach 2, chi dung cho đẩy 1 giá trị
       //     $question_array = []; 
        }
        echo json_encode($question_array);
    }


?>
