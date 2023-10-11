const { log } = require("console");
const fs = require("fs");
class DB {
  constructor(folder_path) {
    this.folderpath = folder_path;
  }
  drop_db() {
    //will be called drysty
    fs.unlink(this.filePath, (err) => {
      if (err) {
        console.error("Error deleting the file:", err);
      } else {
        console.log("File deleted successfully.");
      }
    });
  }

  add_to_db(item, collection_name) {
    var data_from_collection = this.gett_all_items_from_db(collection_name);
    data_from_collection.append(item);
  }

  create_db(name) {
    fs.mkdir(name, (err) => {
      if (err) {
        console.error("Error creating folder:", err);
      } else {
        console.log(`Folder '${name}' created successfully.`);
      }
    });
  }

  create_collection(name) {
    try {
      fs.writeFileSync(
        `${this.folderpath}/${name}`,
        JSON.stringify([], null, 2)
      );
    } catch (err) {
      log(err);
    }
    this.data_from_file[name] = [];
  }

  delete_from_db(item_filter, collection_name, only_first) {
    const data = this.gett_all_items_from_db(collection_name);
    for (let i = 0; i < data.length; i++) {
      if (doesObjectMatchTemplate(item_filter, data[i])) {
        data;
      }
    }
  }

  write_to_db(collection_name, content) {
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
        for (const key in new_item) {
          data_from_collection[i][key] = new_item[key];
        }
        if (only_first) {
          this.write_to_db(collection_name, data_from_collection);
          return;
        }
      }
    }
    this.write_to_db(collection_name, data_from_collection);
  }

  gett_all_items_from_db(collection_name) {
    const data = fs.readFileSync(`${this.folderpath}/${collection_name}`);
    return data;
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
        found_items.append(data_from_collection[i]);
        if (only_first) {
          return data_from_collection[i];
        }
      }
    }
    return found_items;
  }

  //   write_to_files() {} //will be called in the end after everything so that changes are written to the db
}
module.exports = {
  DB,
};
