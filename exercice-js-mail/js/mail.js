// Ajouter l'événement click au button
var button = document.querySelector('button');
button.addEventListener("click",ajouterLigne);

// Ajouter l'événement change  au checkbox

var checkbox = document.querySelector('#selectAll');
checkbox.addEventListener("change",function () {

    var check = document.querySelectorAll('input[name="check"]');

    for (var i = 0; i < check.length; i++) {
        if (check[i].checked) {
            check[i].checked = false;
        }else{
            check[i].checked = true;
        }

    }

    var checkChecked = document.querySelectorAll('input[name="check"]:checked');

    if(checkChecked.length <= 0 && document.querySelector('#btn_Delete') != null){
        var button = document.querySelector('#btn_Delete');
        document.querySelector('.container').removeChild(button);
    }else if(checkChecked.length > 0 && document.querySelector('#btn_Delete') == null){
        var button = document.createElement('button');
        button.setAttribute('type','button');
        button.setAttribute('id','btn_Delete');
        button.setAttribute('class','btn btn-danger');
        var txt = document.createTextNode('Delete Selected Items');
        button.appendChild(txt);
        console.log(button);
        document.querySelector('.container').appendChild(button);
        button.addEventListener('click',supprimerLesLignesSelectionnees);
    }


    /* console.log(listC);

        if(this.checked){
            for(var j=0; j<SelectedItems.length; j++){
               check[j].setAttribute('checked','checked');
            }
        }else{
           for(var j=0; j<check.length; j++){
              check[j].removeAttribute('checked');
           }
        }

    */


});


/**
 * Ajoute une ligne à la fin du tbody de la table
 */
function ajouterLigne(){

    var obj = document.querySelector('#objet');
    var msg = document.querySelector('#message');
    var status = document.querySelector('input[name="entree"]');
    var tbody = document.querySelector('tbody');
    var tr = creerLigne(obj ,msg ,status);
    tbody.appendChild(tr);

    // Clear Input Texts

    obj.value = '';
    msg.value = '';

}

/**
 * Crée un élément tr (ligne du tableau)
 * @param  object string : L'objet du message à extraire de la zone de texte
 * @param  message string : le message à extraire de la zone de texte
 * @param etat string : Normal ou Urgent
 * @return HTMLTableRowElement : Elément de type tr prêt à être inséré dans le tableau.
 */
function creerLigne(object, message, etat){

    var rowRef = document.createElement("tr");

    var cell1   = rowRef.insertCell(0);
    var cell2   = rowRef.insertCell(1);
    var cell3   = rowRef.insertCell(2);
    var cell4   = rowRef.insertCell(3);

    var input = document.createElement('input');
    input.setAttribute('name','check');
    input.setAttribute('type','checkbox');
    var input2 = document.createElement('input');
    input2.setAttribute('id','sup');
    input2.setAttribute('value','X');
    input2.setAttribute('type','button');
    input2.setAttribute('class','btn btn-danger');

    //add Event to checkbox
    input.addEventListener('change', CreateSupButton);
    input2.addEventListener('click', supprimerLigne);

    if(etat.checked == false){
        rowRef.style.backgroundColor = "#F78181";
    }

    var obj  = document.createTextNode(object.value);
    var msg  = document.createTextNode(message.value);

    cell1.appendChild(input);
    cell2.appendChild(obj);
    cell3.appendChild(msg);
    cell4.appendChild(input2);

    //console.log(rowRef);
    return rowRef;

}

/**
 * Create Delete Button
 */

function CreateSupButton() {

    if(this.checked && document.querySelector('#btn_Delete') == null){

        var button = document.createElement('button');
        button.setAttribute('type','button');
        button.setAttribute('id','btn_Delete');
        button.setAttribute('class','btn btn-danger');
        var txt = document.createTextNode('Delete Selected Items');
        button.appendChild(txt);

        document.querySelector('.container').appendChild(button);

        button.addEventListener('click',supprimerLesLignesSelectionnees);

    }else{
        var checkboxesChecked = document.querySelectorAll('input[name="check"]:checked');//input[type="checkbox"]:checked
        /*var checkboxesChecked = [];
        // loop over them all
        for (var i=0; i<checkboxes.length; i++) {
            // And stick the checked ones onto an array...
            if (checkboxes[i].checked) {
                checkboxesChecked.push(checkboxes[i]);
            }
        }*/

        if(checkboxesChecked.length <= 0 && document.querySelector('#btn_Delete') != null){
            var button = document.querySelector('#btn_Delete');
            document.querySelector('.container').removeChild(button);
        }

    }

}


/**
 * Supprime une ligne
 * @param tr HTMLTableRowElement : La ligne qu'on veut supprimer
 */
function supprimerLigne(tr){
    var My_row = tr.target.parentNode.parentNode;
    var tbody = document.querySelector('tbody');
    tbody.removeChild(My_row);
}

/**
 * Supprime toutes les lignes sélectionnées
 */
function supprimerLesLignesSelectionnees(){

    var checkChecked = document.querySelectorAll('input[name="check"]:checked');
    var tbody = document.querySelector('tbody');
    for (var i = 0; i < checkChecked.length; i++) {
        var tr = checkChecked[i].parentNode.parentNode;
        tbody.removeChild(tr);
    }
    var button = document.querySelector('#btn_Delete');
    document.querySelector('.container').removeChild(button);
}