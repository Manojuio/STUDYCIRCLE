import ApiResponse from "../utils/ApiResponse.js";
import {
  createResourceService,
  listResourcesService,
  deleteResourcesService
} from "../services/resource.service.js";

export const createResource = async (req, res, next) => {
  try {
    const { title, link } = req.body;

    const resource = await createResourceService(
      req.params.groupId,
      req.user.id,
      title,
      link
    );

    res.status(201).json(
      new ApiResponse(201, resource, "Resource link added")
    );
  } catch (err) {
    next(err);
  }
};

export const listResources = async (req, res, next) => {
  try {
    const resources = await listResourcesService(
      req.params.groupId,
      req.user.id
    );

    res.status(200).json(
      new ApiResponse(200, resources, "Resources fetched")
    );
  } catch (err) {
    next(err);
  }
};

export const deleteResources = async (req, res, next) => {
  try {
    const resources = await deleteResourcesService(
      req.params.groupId,
      req.user.id
    );

    res.status(200).json(
      new ApiResponse(200, resources, "Resources deleted")
    );
  } catch (err) {
    next(err);
  } 
};
