<div class="container justify-content-xl-center">
    <div class="row mt-3">
        <div class="col-2" id="addBtnWrap">
            <button id="addBtn" class="btn btn-primary">Add New Profile</button>
        </div>
        <div class="col-2" id="cancelAddBtnWrap">
            <button id="cancelAddBtn" class="btn btn-secondary">Cancel</button>
        </div>
        <div class="col-9">
        </div>
        <div class="col-1">
            <button class="btn btn-success saveBtn">Save</button>
        </div>
    </div>

    <div class="row mt-3" id="addProfileNameWrap">
        <div class="col">
            <input id="addProfileName" class="form-control" type="text" placeholder="Profile Name">
        </div>
    </div>

    <div class="row mt-3" id="editAreaWrap">
        <div class="col-4" id="profilesDropdownWrap">
            <select class="form-control" id="profilesDropdown">
                <option value="select">Choose Profile</option>
                <?php foreach ($profiles as $profile) : ?>
                    <option value="<?php echo $profile['profile_name']; ?>"
                            data-description="<?php echo htmlentities($profile['description']); ?>"
                            data-id="<?php echo $profile['uid']; ?>"
                    ><?php echo $profile['profile_name']; ?></option>
                <?php endforeach; ?>
            </select>
        </div>
        <div class="col-4" id="editProfileNameWrap">
            <input id="editProfileName" class="form-control" type="text" placeholder="Profile Name">
        </div>
        <div class="col-1" id="editBtnWrap">
            <button class="btn btn-primary" id="editBtn">Edit</button>
        </div>
        <div class="col-1" id="cancelEditBtnWrap">
            <button class="btn btn-secondary" id="cancelEditBtn">Cancel</button>
        </div>
        <div class="col-1" id="copyBtnWrap">
            <button class="btn btn-light" id="copyBtn">Copy</button>
        </div>
    </div>

    <div class="row mt-3" id="descriptionWrap">
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <div id="description">
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row mt-3" id="doNotCopyWrap">
        <div class="col text-danger">
            Do not copy and paste from Word.
        </div>
    </div>

    <div class="row mt-3" id="addEditorWrap">
        <div class="col">
            <textarea id='addEditor'>
            </textarea>
        </div>
    </div>

    <div class="row mt-3" id="editorWrap">
        <div class="col">
            <textarea id='editor' name='content'>
            </textarea>
        </div>
    </div>

    <div class="row mt-3" id="saveBtnWrap">
        <div class="col">
            <button class="btn btn-success saveBtn">Save</button>
        </div>
    </div>
</div>
