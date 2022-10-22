import { createServer, Model, RestSerializer } from "miragejs";
import { v4 } from "uuid";

export default function setupMockServer() {
  createServer({
    serializers: {
      application: RestSerializer
    },

    models: {
      user: Model
    },

    routes() {
      this.namespace = "api";
      this.timing = 1000;
      this.resource("users");
    },

    seeds(server) {
      server.create("user", { id: v4(), name: "Aamir" });
      server.create("user", { id: v4(), name: "Owais" });
    }
  });
}
