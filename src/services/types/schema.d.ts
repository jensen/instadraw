import { definitions } from "./supabase";

type IUserResource = definitions["profiles"];
type ILayerResource = definitions["layers"] & { user: IUserResource };
type ICommentResource = definitions["comments"] & {
  user: IUserResource;
};
type IPostResource = definitions["posts"] & {
  user: IUserResource;
  layers: ILayerResource[];
  comments: ICommentResource[];
};
