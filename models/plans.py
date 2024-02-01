class plans:
    _models = [
        ["Free Plan", "1 Workspace and 5 users"],
        ["Standard Plan", "3 Workspaces and 20 users"],
        ["Professional Plan", "10 Workspaces and 50 users"]
    ]

    def _plan_info(plan):
        match plan:
            case 1:
                return plans._models[0]
            case 2:
                return plans._models[1]
            case 3:
                return plans._models[2]
            case _:
                return False
            
    def _plan_all():
        return plans._models