module.exports = {
    // Hàm chuyển đổi mảng các tài liệu Mongoose thành đối tượng thuần
    multipleMongooseObjectToObject: function (arrays) {
      return arrays.map(array => array.toObject());
    },
    mongooseToObject: function (array) {
      return array ? array.toObject() : array;
    }
  };
  