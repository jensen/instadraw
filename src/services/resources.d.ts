import { definitions } from "./types/supabase";

type IUserResource = definitions["profiles"];
type IPostResource = definitions["posts"] & { user: IUserResource };
type ILayerResource = definitions["layers"] & { user: IUserResource };
type ICommentResource = definitions["comments"] & { user: IUserResource };
