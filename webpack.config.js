const webpack = require("webpack");

module.exports = {
  // 기존 설정 유지
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(true), // 이 줄 추가
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true,
    }),
  ],
};
