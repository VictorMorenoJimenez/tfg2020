.PHONY: help
.DEFAULT_GOAL := help 

SHELL= /bin/bash
help: ## This help.
	@echo @echo -e "\e[1;35m Makefile for project,generates doc files \e[0m"
	@echo
	@echo
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@echo


DOT := $(command -v pdflatex 2> /dev/null)


doc_gen: ## Generate pdf.
		cd doc/latex; \
			pdflatex proyecto.tex

	  
