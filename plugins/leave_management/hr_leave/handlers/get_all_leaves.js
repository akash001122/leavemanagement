'use strict';

const leaveHandler = async (request, h) => {
  try {
    const leaveDetail = await request.server.methods.get_all_leaves();
    return {
      statusCode: 200,
      message: 'Leave Details fetched Successfully',
      data: {
        leavehistory: leaveDetail,
      },
    };
  } catch (e) {
    throw e;
  }
};
exports.leaveHandler = leaveHandler;
