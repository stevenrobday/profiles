let editMode = false;
let addMode = false;

tinymce.init({
    selector:'#editor',
    plugins: 'lists code',
    toolbar: 'undo redo | bold italic underline | numlist bullist',
    menu: {
        sourcecode: {title: 'Code', items: 'code'}
    },
    menubar: 'sourcecode',
    height: 600
});

tinymce.init({
    selector:'#addEditor',
    plugins: 'lists code',
    toolbar: 'undo redo | bold italic underline | numlist bullist',
    menu: {
        sourcecode: {title: 'Code', items: 'code'}
    },
    menubar: 'sourcecode',
    height: 600
});

$('#addBtn').on("click", function () {
    editMode = false;
    addMode = true;

    $('#addBtnWrap').css("display", "none");
    $('#cancelAddBtnWrap').css("display", "flex");
    $('#addProfileNameWrap').css("display", "flex");
    $('#editAreaWrap').css("display", "none");
    $("#descriptionWrap").css("display", "none");
    $("#doNotCopyWrap").css("display", "flex");
    $("#addEditorWrap").css("display", "flex");
    $("#editorWrap").css("display", "none");
    $('#saveBtnWrap').css("display", "flex");
    $('.saveBtn').css("display", "flex");
    tinymce.get("addEditor").setContent('');
});

$('#cancelAddBtn').on("click", function () {
    addMode = false;
    editMode = false;

    $('#addBtnWrap').css("display", "flex");
    $('#cancelAddBtnWrap').css("display", "none");
    $('#addProfileNameWrap').css("display", "none");
    $('#editAreaWrap').css("display", "flex");
    $('#profilesDropdownWrap').css("display", "flex");
    $("#editProfileNameWrap").css("display", "none");
    $('#editBtnWrap').css("display", "flex");
    $('#copyBtnWrap').css("display", "flex");
    $("#cancelEditBtnWrap").css("display", "none");
    $("#doNotCopyWrap").css("display", "none");
    $("#addEditorWrap").css("display", "none");
    $("#editorWrap").css("display", "none");
    $('#saveBtnWrap').css("display", "none");
    $('.saveBtn').css("display", "none");

    if ($('#profilesDropdown').find(':selected').val() !== "select") {
        $("#descriptionWrap").css("display", "flex");
        let description = $('#profilesDropdown').find(':selected').data('description');
        $("#description").html(description);
    }
});

$('#editBtn').on("click", function () {
    editMode = true;
    addMode = false;

    $('#editBtnWrap').css("display", "none");
    $('#cancelEditBtnWrap').css("display", "flex");
    $('#copyBtnWrap').css("display", "none");

    let profilesDropdown = $('#profilesDropdown');
    let profileName = profilesDropdown.find(':selected').val();

    if (profileName !== "select") {
        $('#profilesDropdownWrap').css("display", "none");
        let editProfileName = $('#editProfileName');
        editProfileName.val(profileName);
        editProfileName.attr("data-id", profilesDropdown.find(':selected').data('id'));
        $('#editProfileNameWrap').css("display", "flex");
        $('#saveBtnWrap').css("display", "flex");
        $('.saveBtn').css("display", "flex");
        $("#descriptionWrap").css("display", "none");
        $("#doNotCopyWrap").css("display", "flex");
        $("#editorWrap").css("display", "flex");
        let description = profilesDropdown.find(':selected').data('description');
        tinymce.get("editor").setContent(description);
    }
});

$('#cancelEditBtn').on("click", function () {
    editMode = false;

    $('#profilesDropdownWrap').css("display", "flex");
    $("#editProfileNameWrap").css("display", "none");
    $('#editBtnWrap').css("display", "flex");
    $('#copyBtnWrap').css("display", "flex");
    $('#cancelEditBtnWrap').css("display", "none");
    $('#saveBtnWrap').css("display", "none");
    $('.saveBtn').css("display", "none");

    if ($('#profilesDropdown').find(':selected').val() !== "select") {
        $("#descriptionWrap").css("display", "flex");
        $("#doNotCopyWrap").css("display", "none");
        $("#editorWrap").css("display", "none");
        let description = $('#profilesDropdown').find(':selected').data('description');
        $("#description").html(description);
    }
});

$('#profilesDropdown').on('change', function() {
    let profileName = $(this).val();
    if (profileName !== "select") {
        let description = $(this).find(':selected').data('description');

        if (!editMode) {
            $('#saveBtnWrap').css("display", "none");
            $('.saveBtn').css("display", "none");
            $("#descriptionWrap").css("display", "flex");
            $("#doNotCopyWrap").css("display", "none");
            $("#editorWrap").css("display", "none");
            $("#description").html(description);
        }
        else {
            $('#profilesDropdownWrap').css("display", "none");
            let editProfileName = $('#editProfileName');
            editProfileName.val(profileName);
            editProfileName.attr("data-id", $(this).find(':selected').data('id'));
            $('#editProfileNameWrap').css("display", "flex");
            $('#saveBtnWrap').css("display", "flex");
            $('.saveBtn').css("display", "flex");
            $("#descriptionWrap").css("display", "none");
            $("#doNotCopyWrap").css("display", "flex");
            $("#editorWrap").css("display", "flex");
            let description = $(this).find(':selected').data('description');
            tinymce.get("editor").setContent(description);
        }
    }
    else {
        $("#descriptionWrap").css("display", "none");
        $("#doNotCopyWrap").css("display", "none");
        $("#editorWrap").css("display", "none");
    }
});

$('#copyBtn').on("click", function () {
    let copyText = $("#description").html();

    function listener(e) {
        e.clipboardData.setData("text/html", copyText);
        e.clipboardData.setData("text/plain", copyText);
        e.preventDefault();
    }
    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);
    alert("Your text has been copied to the clipboard.");
});

$('.saveBtn').on("click", function () {
    if (addMode) {
        let profileName = $('#addProfileName').val();
        let description = tinymce.get("addEditor").getContent();
        $.ajax({
            url: "/profiles/addProfile",
            method: 'post',
            data: {profile_name: profileName, description: description},
            dataType: 'json',
            success: function(data) {
                location.reload();
            }
        });
    }
    else if (editMode) {
        let editProfileName = $('#editProfileName');
        let uid = editProfileName.data("id");
        let profileName = editProfileName.val();
        let description = tinymce.get("editor").getContent();

        $.ajax({
            url: "/profiles/editProfile",
            method: 'post',
            data: {uid: uid, profile_name: profileName, description: description},
            dataType: 'json',
            success: function(data) {
                location.reload();
            }
        });
    }
});