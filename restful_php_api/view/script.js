// const cauhoi = document.getElementById('title'); // lay doi tuong DOM theo ID
const submitBtn = document.getElementById('submit');
const cautraloi = document.querySelectorAll('.cautraloi'); // lay doi tuong DOM theo class, id hoac cac bo chon khac
const quiz = document.getElementById('question');
let cauhoi_hientai = 0;
let diem = 0;
let socaudung = 0;

load_cauhoi()
const data_cauhoi = '';
function load_cauhoi(){

    submitBtn.disabled = true;
    remove_answer();
    fetch('http://localhost/restful_php_api/api/question/read.php')
    .then(res => res.json())
    .then(data => {
    // console.log(data);
    document.getElementById('tongsocauhoi').value = data.question.length;
   // alert(document.getElementById('caudung').value);
    const cauhoi = document.querySelector('#title'); // lay doi tuong DOM theo ID
    const a_cautraloi = document.getElementById('a_cautraloi');
    const b_cautraloi = document.getElementById('b_cautraloi');
    const c_cautraloi = document.getElementById('c_cautraloi');
    const d_cautraloi = document.getElementById('d_cautraloi');
        //hien thi cau hoi va cau tra loi
        const get_cauhoi = data.question[cauhoi_hientai];
     //   console.log(get_cauhoi);

        cauhoi.innerText = get_cauhoi.title;
        a_cautraloi.innerText = get_cauhoi.cau_a;
        b_cautraloi.innerText = get_cauhoi.cau_b;
        if(get_cauhoi.cau_c != null){
        c_cautraloi.innerText = get_cauhoi.cau_c;
        document.getElementById('cau_c').classList.remove('hienthicautraloi');
        } else {
            document.getElementById('cau_c').classList.add('hienthicautraloi');
        }
        if(get_cauhoi.cau_d != null){
        d_cautraloi.innerText = get_cauhoi.cau_d;
        document.getElementById('cau_d').classList.remove('hienthicautraloi');
        } else {
            document.getElementById('cau_d').classList.addClass('hienthicautraloi');
        }
        document.getElementById('caudung').value = get_cauhoi.cau_dung;
    //    alert(document.getElementById('caudung').value);
    })

.catch(error => console.log(error));
}

cautraloi.forEach((ele) => {
    ele.addEventListener("change", function(event){
        submitBtn.removeAttribute("disabled");
    });
})

//chon cau tra loi
function get_answer(){
    let answer = undefined;
    cautraloi.forEach((cautraloi) => {
        if(cautraloi.checked){
            answer = cautraloi.id;
        }
    })
    return answer;
}

//remove cau tra loi
function remove_answer(){
    cautraloi.forEach((cautraloi) => {
        cautraloi.checked = false;
    })
}



    // su kien click submit
submitBtn.addEventListener("click", () => {
        const answer = get_answer();
        console.log(answer);

        if(answer){
            if(answer === document.getElementById('caudung').value){
                socaudung++;
                diem++;
            }
        }

        cauhoi_hientai++;
        load_cauhoi();

        if(cauhoi_hientai < document.getElementById('tongsocauhoi').value){
            load_cauhoi();
        }else{
            const tongsocauhoi = document.getElementById('tongsocauhoi').value;

            quiz.innerHTML = `<h2> Bạn đã đúng ${socaudung}/${tongsocauhoi} cau hoi.</h2>
                              <button onclick="location.reload()">Lam lai bai </button> `
        }
})


