/**
 * Created by MD on 21.03.2017.
 */


/// Menu barinda tıklanmıs  olan itemi gösterecek
function tik(obj) {
    id = obj.getAttribute("id");
    document.getElementById("menu").innerHTML = this.id;

}

// amac hedef txt dosyası cagırılıyor
function amacHedef() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("ortasag").innerHTML = this.responseText; // ortasag ıcerıgıne yerlestırılıyor
        }
    };
    xhttp.open("GET", "AmacVeHedefler.txt", true); //async asenkron  true yapıldı
    xhttp.send();
}

// Ders Planı html dosyasını getırıyoruz burada (ogr%6+1)=2. yarıyıl derslerının tablosu mevcut
//ayrıca bu tabloda tıklanan her ders ismini icerikjson() fonskiyonuna parametre olarak alıyoruz Dersplani.html de

function dersPlani() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("ortasag").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "DersPlani.html", true);
    xhttp.send();
}

// Dersiceriklerinin bulundugu tablo cagırılıyor ardından ıcerık json dosyası okunup tablo  dolduruluyor
// alınan parametre ders json içeriğinde eşlenerek bilgileri getiriliyor.

function icerik_Json(ders) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            document.getElementById("ortasag").innerHTML = this.responseText;

            var hr = new XMLHttpRequest();
            hr.open("GET","DersIcerikleri.json","true");
            hr.setRequestHeader("Content-type","application/json",true);
            hr.onreadystatechange = function (){
                if(hr.readyState == 4 && hr.status == 200 ) {
                    var data = JSON.parse(hr.responseText);

                    var results = document.getElementById("ders");
                    results.innerHTML=data[ders].Ders;
                    var results = document.getElementById("kod");
                    results.innerHTML=data[ders].Kodu;
                    var results=document.getElementById("yariyil");
                    results.innerHTML=data[ders].Yarıyıl;
                    var results=document.getElementById("saat");
                    results.innerHTML=data[ders].Saat;
                    var results=document.getElementById("kredi");
                    results.innerHTML=data[ders].Kredi;
                    var results=document.getElementById("akts");
                    results.innerHTML=data[ders].AKTS;
                    var results=document.getElementById("onkosul");
                    results.innerHTML=data[ders].OnKosulDersleri;
                    var results=document.getElementById("onsecmeliders");
                    results.innerHTML=data[ders].OnerilenSecmeliDersler;
                    var results=document.getElementById("dil");
                    results.innerHTML=data[ders].DersinDili;
                    var results=document.getElementById("dersinseviyesi");
                    results.innerHTML=data[ders].DersinSeviyesi;
                    var results=document.getElementById("dersturu");
                    results.innerHTML=data[ders].DersinTürü;
                    var results=document.getElementById("dersinkoordinatoru");
                    results.innerHTML=data[ders].DersinKoordinatörü;
                    var dersveren=document.getElementById("dersiveren");
                    var verenler=data[ders].DersiVeren;

                    for(var i=0 ; i<verenler.length ; i++)
                        dersveren.innerHTML += "<a>"+verenler[i]+"</a><br>";

                    var results=document.getElementById("dersinyardimcilari");
                    results.innerHTML=data[ders].DersinYardımcıları;
                    var results=document.getElementById("dersinamaci");
                    results.innerHTML=data[ders].DersinAmacı;
                    var results=document.getElementById("dersicerigi");
                    results.innerHTML=data[ders].DersinIcerigi;
                }
            }
            hr.send(null);
        }
    };
    xhttp.open("GET", "tablo.html", true);
    xhttp.send();
}


// Programogrenme.html dosyasını ve getırıyoruz burada tab menu mevcut
//ardından icerisine xml dosyasını yukluyoruz 

function programogrenme() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("ortasag").innerHTML = this.responseText;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {


                    var bilgiler= this.responseXML.getElementsByTagName("bilgiler"); //xml deki bilgiler rootlarini aldik
                    var bilgilersayisi = bilgiler.length; // bizde 3 tane var
                    var yer =document.getElementById("siniflandirilmis");  //
                    for(var i = 0 ; i< bilgilersayisi ; i++ )
                    {
                        var baslik = bilgiler[i].getElementsByTagName("title"); // bilgiler icerisindeki title aliniyor bilgiler[0]=bilgiler, bilgiler[1]=beceriler ,bilgiler[2]=yetkinlikler
                        for(var k =0 ; k<baslik.length ; k++) //her defasında 1 kere dönecek başlıgı yazacak
                        {
                            var baslikText = baslik[k].firstChild.nodeValue;
                            yer.innerHTML+="<b>"+baslikText+"</b><br><br><ul>";
                        }
                        var bilgi = bilgiler[i].getElementsByTagName("bilgi"); // bilgiler[0] ,bilgiler[1],bilgiler[2] icersindeki bilgiler alınıyor
                        for(var j =0 ; j<bilgi.length ; j++)  //bilgiler[0] icin 2 kere dönecek
                        {
                            var bilgiText = bilgi[j].firstChild.nodeValue; //
                            yer.innerHTML+="<li>"+bilgiText+"</li><br>";

                        }
                        yer.innerHTML+="</ul><br><br>";  //  ul kapat boşluk at ve kapanış.
                    }
                }
            };
            xhttp.open("GET", "ProgramOgrenmeCiktilari.xml", true);
            xhttp.send();

        }
    };
    xhttp.open("GET", "programogrenmetab.html", true);
    xhttp.send();
}


