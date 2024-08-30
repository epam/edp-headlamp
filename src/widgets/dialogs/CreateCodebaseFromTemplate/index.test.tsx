/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../../mocks/wrappers/default';
import { CreateCodebaseFromTemplateDialog } from '.';

test('renders CreateCodebaseFromTemplate Create component', () => {
  render(
    <TestWrapper>
      <CreateCodebaseFromTemplateDialog
        props={{
          template: {
            apiVersion: 'v2.edp.epam.com/v1alpha1',
            kind: 'Template',
            metadata: {
              name: 'antora',
              namespace: 'edp-delivery-vp-dev',
              creationTimestamp: '',
              uid: '',
            },
            spec: {
              buildTool: 'npm',
              category: 'docs',
              description:
                'Utilize the AsciiDoc markup language to construct, arrange, and manage your documentation while adopting a Documentation as Code methodology.',
              displayName: 'Documentation as Code with Antora',
              framework: 'antora',
              icon: [
                {
                  base64data:
                    'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMzIgMzIiPjxnIGZpbGw9Im5vbmUiPjxwYXRoIGZpbGw9IiNGM0FENjEiIGQ9Ik0yOS4zNzQgMmgtNC4xN2EyMi40IDIyLjQgMCAwIDAtNi4xOTQuODc0bC0xLjk5IDMuMTdMMTQuMDEyIDVhMjIuMzk1IDIyLjM5NSAwIDAgMC0zLjI2OSAyLjNhMTkuMDI1IDE5LjAyNSAwIDAgMC02LjcyIDE0LjUxdjMuMjVzLjE3LS4zLjQ5LS44MWMtLjA5LjM4LS4xMy41OS0uMTMuNTl2LjIyaDMuOTJjMi4wOCAwIDQuMDgtLjQ3IDUuODktMS4zNGMuMjEtLjEuMjEtLjQgMC0uNWwtMi4xNy0xLjAxYy0uMTMtLjA0LS4wOS0uMjEuMDQtLjIxaDQuNTNjLjIxIDAgLjQxLS4wOC41Ny0uMjFjMS4zMy0xLjE0IDIuNDUtMi41NCAzLjI3LTQuMTVjLjMtLjYuODctMS42NyAxLjE4LTIuMjVjLjEzLS4yNC4xMi0uNTMtLjAyLS43N2wtMS4zNi0yLjI0YS4yNS4yNSAwIDAgMSAuMjEtLjM4bDEuNTMzLS45OTRsMi4wNDQtMS45OThsMi43Ni0yLjAwMmE0NS44NjEgNDUuODYxIDAgMCAxIDMuMDQzLTMuODE2Yy4xMy0uMTQuMi0uMzMuMi0uNTJhLjY1My42NTMgMCAwIDAtLjY1LS42N1oiLz48cGF0aCBmaWxsPSIjQTU2OTUzIiBkPSJNMTQgMTJoOS4xMTRjLjI2IDAgLjUxLS4xNC42NC0uMzZjLjk0LTEuNTcgMS45Ni0zLjE0IDMuMDQtNC42NGgtNy43OVYyLjg4QTIyLjEyOSAyMi4xMjkgMCAwIDAgMTQgNS4wMTZWMTJaIi8+PHBhdGggZmlsbD0iI0QzODgzRSIgZD0iTTI1LjI4NCA0LjE0YS40OTguNDk4IDAgMCAwLS42NS0uMjNjLTQuNiAyLjA3LTguNzQgNC45NC0xMi4zNCA4LjUzYTQxLjU4NCA0MS41ODQgMCAwIDAtOC45MiAxMy4yMmE0MS40NyA0MS40NyAwIDAgMC0xLjM1IDMuNjdjLS4wOS4zLjA4LjYxLjM4LjY2Yy4yNi4wNS41LS4xMS41Ny0uMzVjLjM4LTEuMjEuODItMi40MSAxLjMyLTMuNTljMi4wNC00LjgzIDQuOTctOS4xOCA4LjctMTIuOWMzLjUxLTMuNTEgNy41NS02LjMgMTIuMDQtOC4zMmEuNS41IDAgMCAwIC4yNS0uNjljMCAuMDEgMCAuMDEgMCAwWiIvPjwvZz48L3N2Zz4=',
                  mediatype: 'image/svg+xml',
                },
              ],
              keywords: ['antora', 'asciidoc', 'documentation', 'technical writing'],
              language: 'javascript',
              maintainers: [
                {
                  email: 'email',
                  name: 'name',
                },
              ],
              maturity: 'stable',
              minEDPVersion: '3.4.0',
              source: 'https://github.com/test',
              type: 'application',
              version: '0.1.0',
            },
          },
        }}
        state={{
          open: true,
          openDialog: jest.fn(),
          closeDialog: jest.fn(),
        }}
      />
    </TestWrapper>
  );

  const dialog = screen.getByTestId('dialog');
  expect(dialog).toMatchSnapshot();
});
