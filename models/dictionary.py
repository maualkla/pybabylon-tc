class dictionary:
    _models = [
        ["Exception", "Error", ">> Function: ", "(!)"],
        ["Excepcion", "Error", ">> Funcion: ", "(!)"],
        ["Ausnahme", "Fehler", ">> Funktion: ", "(!)"]
    ]

    def _get_one_value(lang, id):
        return dictionary._models[lang][id]
            
    def _get_all_values():
        return dictionary._models