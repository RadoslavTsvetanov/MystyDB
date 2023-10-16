const { log } = require("console");
const fs = require("fs");
const os = require("os");
const path = require("path");

function DoesDBFolderExist(folder_path) {
  if (fs.existsSync(folder_path)) {
    console.log("Folder exists.");
    return true;
  } else {
    console.log("Folder does not exist.");
    return false;
  }
}

function doesObjectMatchTemplate(object, template) {
  console.log("-----");
  log(object);
  log(template);
  for (const key in object) {
    if (template.hasOwnProperty(key)) {
      if (object[key] !== template[key]) {
        return false; // Object does not match the template
      }
    } else {
      return false;
    }
  }
  return true; // Object matches the template
}
class DB {
  constructor(folder_path) {
    this.folderpath = `${path.join(
      os.homedir(),
      "Desktop"
    )}\\DB\\${folder_path}`;
  }
  add_element_to_collection(item, collection_name) {
    const data_from_collection = this.gett_all_items_from_db(collection_name); // Read existing data
    log(data_from_collection);
    data_from_collection.push(item); // Modify the data
    log(data_from_collection);
    this.write_to_db(collection_name, data_from_collection); // Write the modified data back to the file
  }

  delete_collection(collection_name) {
    fs.unlink(`${this.folderpath}/${collection_name}.json`, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("succes");
      }
    });
  }

  drop_db() {
    //will be called drysty
    fs.unlink(this.folderpath, (err) => {
      if (err) {
        console.error("Error deleting the file:", err);
      } else {
        console.log("File deleted successfully.");
      }
    });
  }

  create_db() {
    if (!DoesDBFolderExist(`${path.join(os.homedir(), "Desktop")}\\DB`)) {
      fs.mkdir(`${path.join(os.homedir(), "Desktop")}\\DB`, (err) => {
        if (err) {
          console.log("Error creating");
        } else {
          log("succes");
        }
      });
    }
    fs.mkdir(this.folderpath, (err) => {
      if (err) {
        console.error("Error creating folder:", err);
      } else {
        console.log(`Folder  created successfully.`);
      }
    });
  }

  create_collection(name) {
    try {
      fs.writeFileSync(
        `${this.folderpath}/${name}.json`,
        JSON.stringify([], null, 2)
      );
    } catch (err) {
      log(err);
    }
  }

  delete_from_collection(item_filter, collection_name, only_first) {
    const data = this.gett_all_items_from_db(collection_name);
    for (let i = 0; i < data.length; i++) {
      if (doesObjectMatchTemplate(item_filter, data[i])) {
        data.splice(i, 1);
        if (only_first) {
          this.write_to_db(collection_name, data);
        }
      }
    }
  }

  write_to_db(collection_name, content) {
    log(content);
    fs.writeFile(
      `${this.folderpath}/${collection_name}`,
      JSON.stringify(content),
      (err) => {
        if (err) {
          console.error("Error writing JSON file:", err);
        } else {
          console.log("JSON data has been written to");
        }
      }
    );
  }

  update_item_from_db(item_filter, new_item, collection_name, only_first) {
    const data_from_collection = this.gett_all_items_from_db(collection_name);
    for (let i = 0; i < data_from_collection.length; i++) {
      if (doesObjectMatchTemplate(item_filter, data_from_collection[i])) {
        log("vyi");
        data_from_collection[i] = new_item;
        if (only_first) {
          this.write_to_db(collection_name, data_from_collection);
          return;
        }
      }
    }
    this.write_to_db(collection_name, data_from_collection);
  }

  gett_all_items_from_db(collection_name) {
    const data = fs.readFileSync(
      `${this.folderpath}/${collection_name}`,
      "utf-8"
    );
    return JSON.parse(data);
  }

  // Define a filter condition using a filter function
  // function filterByAge(item) {
  //   return item.age >= 30;
  // }

  get_from_db(filter, collection_name, only_first) {
    const data_from_collection = this.gett_all_items_from_db(collection_name);
    const found_items = [];
    for (let i = 0; i < data_from_collection.length; i++) {
      if (doesObjectMatchTemplate(filter, data_from_collection[i])) {
        found_items.push(data_from_collection[i]);
        if (only_first) {
          return data_from_collection[i];
        }
      }
    }
    return found_items;
  }
}
module.exports = {
  DB,
};
