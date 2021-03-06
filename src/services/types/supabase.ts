/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/comments": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.comments.id"];
          created_at?: parameters["rowFilter.comments.created_at"];
          updated_at?: parameters["rowFilter.comments.updated_at"];
          content?: parameters["rowFilter.comments.content"];
          user_id?: parameters["rowFilter.comments.user_id"];
          post_id?: parameters["rowFilter.comments.post_id"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["comments"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** comments */
          comments?: definitions["comments"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.comments.id"];
          created_at?: parameters["rowFilter.comments.created_at"];
          updated_at?: parameters["rowFilter.comments.updated_at"];
          content?: parameters["rowFilter.comments.content"];
          user_id?: parameters["rowFilter.comments.user_id"];
          post_id?: parameters["rowFilter.comments.post_id"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.comments.id"];
          created_at?: parameters["rowFilter.comments.created_at"];
          updated_at?: parameters["rowFilter.comments.updated_at"];
          content?: parameters["rowFilter.comments.content"];
          user_id?: parameters["rowFilter.comments.user_id"];
          post_id?: parameters["rowFilter.comments.post_id"];
        };
        body: {
          /** comments */
          comments?: definitions["comments"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/layers": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.layers.id"];
          created_at?: parameters["rowFilter.layers.created_at"];
          updated_at?: parameters["rowFilter.layers.updated_at"];
          image?: parameters["rowFilter.layers.image"];
          user_id?: parameters["rowFilter.layers.user_id"];
          post_id?: parameters["rowFilter.layers.post_id"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["layers"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** layers */
          layers?: definitions["layers"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.layers.id"];
          created_at?: parameters["rowFilter.layers.created_at"];
          updated_at?: parameters["rowFilter.layers.updated_at"];
          image?: parameters["rowFilter.layers.image"];
          user_id?: parameters["rowFilter.layers.user_id"];
          post_id?: parameters["rowFilter.layers.post_id"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.layers.id"];
          created_at?: parameters["rowFilter.layers.created_at"];
          updated_at?: parameters["rowFilter.layers.updated_at"];
          image?: parameters["rowFilter.layers.image"];
          user_id?: parameters["rowFilter.layers.user_id"];
          post_id?: parameters["rowFilter.layers.post_id"];
        };
        body: {
          /** layers */
          layers?: definitions["layers"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/posts": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.posts.id"];
          created_at?: parameters["rowFilter.posts.created_at"];
          updated_at?: parameters["rowFilter.posts.updated_at"];
          title?: parameters["rowFilter.posts.title"];
          user_id?: parameters["rowFilter.posts.user_id"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["posts"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** posts */
          posts?: definitions["posts"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.posts.id"];
          created_at?: parameters["rowFilter.posts.created_at"];
          updated_at?: parameters["rowFilter.posts.updated_at"];
          title?: parameters["rowFilter.posts.title"];
          user_id?: parameters["rowFilter.posts.user_id"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.posts.id"];
          created_at?: parameters["rowFilter.posts.created_at"];
          updated_at?: parameters["rowFilter.posts.updated_at"];
          title?: parameters["rowFilter.posts.title"];
          user_id?: parameters["rowFilter.posts.user_id"];
        };
        body: {
          /** posts */
          posts?: definitions["posts"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/profiles": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          name?: parameters["rowFilter.profiles.name"];
          avatar?: parameters["rowFilter.profiles.avatar"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["profiles"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          name?: parameters["rowFilter.profiles.name"];
          avatar?: parameters["rowFilter.profiles.avatar"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          name?: parameters["rowFilter.profiles.name"];
          avatar?: parameters["rowFilter.profiles.avatar"];
        };
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/profiles_private": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles_private.id"];
          email?: parameters["rowFilter.profiles_private.email"];
          admin?: parameters["rowFilter.profiles_private.admin"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["profiles_private"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** profiles_private */
          profiles_private?: definitions["profiles_private"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles_private.id"];
          email?: parameters["rowFilter.profiles_private.email"];
          admin?: parameters["rowFilter.profiles_private.admin"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles_private.id"];
          email?: parameters["rowFilter.profiles_private.email"];
          admin?: parameters["rowFilter.profiles_private.admin"];
        };
        body: {
          /** profiles_private */
          profiles_private?: definitions["profiles_private"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/rpc/handle_new_user": {
    post: {
      parameters: {
        body: {
          args: { [key: string]: unknown };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
}

export interface definitions {
  comments: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: string;
    created_at: string;
    updated_at: string;
    content: string;
    /**
     * Note:
     * This is a Foreign Key to `profiles.id`.<fk table='profiles' column='id'/>
     */
    user_id: string;
    /**
     * Note:
     * This is a Foreign Key to `posts.id`.<fk table='posts' column='id'/>
     */
    post_id: string;
  };
  layers: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: string;
    created_at: string;
    updated_at: string;
    image: string;
    /**
     * Note:
     * This is a Foreign Key to `profiles.id`.<fk table='profiles' column='id'/>
     */
    user_id: string;
    /**
     * Note:
     * This is a Foreign Key to `posts.id`.<fk table='posts' column='id'/>
     */
    post_id: string;
  };
  posts: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: string;
    created_at: string;
    updated_at: string;
    title: string;
    /**
     * Note:
     * This is a Foreign Key to `profiles.id`.<fk table='profiles' column='id'/>
     */
    user_id: string;
  };
  profiles: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: string;
    name?: string;
    avatar?: string;
  };
  profiles_private: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     * This is a Foreign Key to `profiles.id`.<fk table='profiles' column='id'/>
     */
    id: string;
    email?: string;
    admin: boolean;
  };
}

export interface parameters {
  /** Preference */
  preferParams: "params=single-object";
  /** Preference */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /** Preference */
  preferCount: "count=none";
  /** Filtering Columns */
  select: string;
  /** On Conflict */
  on_conflict: string;
  /** Ordering */
  order: string;
  /** Limiting and Pagination */
  range: string;
  /** Limiting and Pagination */
  rangeUnit: string;
  /** Limiting and Pagination */
  offset: string;
  /** Limiting and Pagination */
  limit: string;
  /** comments */
  "body.comments": definitions["comments"];
  "rowFilter.comments.id": string;
  "rowFilter.comments.created_at": string;
  "rowFilter.comments.updated_at": string;
  "rowFilter.comments.content": string;
  "rowFilter.comments.user_id": string;
  "rowFilter.comments.post_id": string;
  /** layers */
  "body.layers": definitions["layers"];
  "rowFilter.layers.id": string;
  "rowFilter.layers.created_at": string;
  "rowFilter.layers.updated_at": string;
  "rowFilter.layers.image": string;
  "rowFilter.layers.user_id": string;
  "rowFilter.layers.post_id": string;
  /** posts */
  "body.posts": definitions["posts"];
  "rowFilter.posts.id": string;
  "rowFilter.posts.created_at": string;
  "rowFilter.posts.updated_at": string;
  "rowFilter.posts.title": string;
  "rowFilter.posts.user_id": string;
  /** profiles */
  "body.profiles": definitions["profiles"];
  "rowFilter.profiles.id": string;
  "rowFilter.profiles.name": string;
  "rowFilter.profiles.avatar": string;
  /** profiles_private */
  "body.profiles_private": definitions["profiles_private"];
  "rowFilter.profiles_private.id": string;
  "rowFilter.profiles_private.email": string;
  "rowFilter.profiles_private.admin": string;
}

export interface operations {}

export interface external {}
