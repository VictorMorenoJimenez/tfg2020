.PHONY: help
.DEFAULT_GOAL := help 

SHELL= /bin/bash
help: ## This help.
	@echo @echo -e "\e[1;35m Makefile for project,generates doc files \e[0m"
	@echo
	@echo
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@echo


DOT=$(command -v pdflatex)

doc_gen: ## Generate pdf.
ifndef DOT
    $(error "pdflatex is not available please install pdflatex")
endif
	cd doc/latex; \
		pdflatex proyecto.tex

	  
