class levels:
    _models = [
        ["BTU", "Basic Tenant User", "User registered by Tenant Owner and only actions that can perform is to log hours in to the system."],
        ["ATU", "Admin Tenant User", "User registered by Tenant Owner and can see the tenant logging hours by all the users in the tenant. Can log hours and can view, update, create and delete data from the tenant. Can modify, add and delete users of type 0."],
        ["TO", "Tenant Owner", "User that registered in the Signup flow and can create workspaces, users in those workspaces and manage everything inside those workspaces. Can also modify its account settings."], 
        ["MOD", "Moderator", "User who can assigned to modify a specific tenant by Type 2 user request."], 
        ["DEV", "Developer", "Is a Tenant owner with no restrictions, can see all options in the application but can not see other users data."], 
        ["ADMIN", "APP Administrator", "User with all rights in the system, can CRUD tables, users and functionalities in the application. Also this user can create Moderators and Developers."]
    ]

    def _type_info(type):
        match type:
            case 0:
                return levels._models[0]
            case 1:
                return levels._models[1]
            case 2:
                return levels._models[2]
            case 3:
                return levels._models[3]
            case 4:
                return levels._models[4]
            case 5:
                return levels._models[5]
            case _:
                return False
            
    def _type_all():
        return levels._models
