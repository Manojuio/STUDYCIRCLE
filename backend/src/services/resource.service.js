import Resource from "../models/resource.model.js";
import Member from "../models/member.model.js";
import ApiError from "../utils/ApiError.js";

export const createResourceService = async (
  groupId,
  userId,
  title,
  link
) => {
  // membership check
  const member = await Member.findOne({ group: groupId, user: userId });

  if (!member) {
    throw new ApiError(403, "Not a member of this group");
  }

  if (!link) {
    throw new ApiError(400, "Link is required");
  }

  return await Resource.create({
    group: groupId,
    uploadedBy: userId,
    title,
    link,
  });
};

export const listResourcesService = async (groupId, userId) => {
  const member = await Member.findOne({ group: groupId, user: userId });

  if (!member) {
    throw new ApiError(403, "Not allowed");
  }

  return Resource.find({ group: groupId }).sort({ createdAt: -1 });
};

export const deleteResourcesService = async (resourceId, userId) => {
  const resource = await Resource.findById(resourceId);

  if (!resource) {
    throw new ApiError(404, "Resource not found");
  }

  if (resource.uploadedBy.toString() !== userId) {
    throw new ApiError(403, "Not allowed You are not the uploader");
  }
 await Resource.findByIdAndDelete(resourceId);

  return { message: "Resource deleted successfully" };
  
};