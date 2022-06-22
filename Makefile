CURRENT_DIR=$(shell pwd)
DIST_DIR=${CURRENT_DIR}/dist
BIN_DIR=${CURRENT_DIR}/bin
OS?=linux

HELMDOCS = ${BIN_DIR}/helm-docs
GITCHGLOG = ${BIN_DIR}/git-chglog

.DEFAULT_GOAL:=help
# set default shell
SHELL=/bin/bash -o pipefail -o errexit
help:  ## Display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z0-9_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

.PHONY: clean
clean:  ## clean up
	-rm -rf ${DIST_DIR} ${BIN_DIR}

# use https://github.com/git-chglog/git-chglog/
.PHONY: changelog
changelog: $(GITCHGLOG)	## generate changelog
ifneq (${NEXT_RELEASE_TAG},)
	$(GITCHGLOG) --next-tag v${NEXT_RELEASE_TAG} -o CHANGELOG.md v0.1.0..
else
	$(GITCHGLOG) -o CHANGELOG.md v0.1.0..
endif

.PHONY: helm-docs
helm-docs: $(HELMDOCS) ## generate helm docs
	$(HELMDOCS)

$(GITCHGLOG): ## Download git-chglog locally if necessary.
	$(call go-get-tool,$(GITCHGLOG),github.com/git-chglog/git-chglog/cmd/git-chglog,v0.15.1)


$(HELMDOCS):
	@mkdir -p $@
	wget https://github.com/norwoodj/helm-docs/releases/download/v1.10.0/helm-docs_1.10.0_${OS}_x86_64.tar.gz -O $@.tar.gz
	tar xf $@.tar.gz -C ${BIN_DIR}

# go-get-tool will 'go install' any package $2 and install it to $1.
PROJECT_DIR := $(shell dirname $(abspath $(lastword $(MAKEFILE_LIST))))
define go-get-tool
@[ -f $(1) ] || { \
set -e ;\
TMP_DIR=$$(mktemp -d) ;\
cd $$TMP_DIR ;\
go mod init tmp ;\
echo "Downloading $(2)" ;\
go get -d $(2)@$(3) ;\
GOBIN=$(PROJECT_DIR)/bin go install $(2) ;\
rm -rf $$TMP_DIR ;\
}
endef
